<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Process;
use Symfony\Component\Console\Command\Command as CommandAlias;

class SetupProject extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'project:setup {--force : Force reinstall dependencies}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Setup project dependencies and build assets';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('🚀 Starting project setup...');
        $this->newLine();

        $force = $this->option('force');

        // Check if Composer is installed
        if (!$this->checkCommand('composer')) {
            $this->error('❌ Composer is not installed or not in PATH');
            return CommandAlias::FAILURE;
        }

        // Check if Node.js is installed
        if (!$this->checkCommand('node')) {
            $this->error('❌ Node.js is not installed or not in PATH');
            return CommandAlias::FAILURE;
        }

        // Check if npm is installed
        if (!$this->checkCommand('npm')) {
            $this->error('❌ NPM is not installed or not in PATH');
            return CommandAlias::FAILURE;
        }

        $this->info('✅ All required tools are available');
        $this->newLine();

        // Install Composer dependencies
        $this->installComposerDependencies($force);

        // Install NPM dependencies
        $this->installNpmDependencies($force);

        // Generate application key if not exists
        $this->generateAppKey();

        // Run database migrations
        $this->runMigrations();

        // Build assets
        $this->buildAssets();

        // Clear caches
        $this->clearCaches();

        $this->newLine();
        $this->info('🎉 Project setup completed successfully!');
        $this->info('💡 You can now start the development server with: php artisan serve');

        return CommandAlias::SUCCESS;
    }

    /**
     * Check if a command is available
     */
    private function checkCommand(string $command): bool
    {
        $result = Process::run(sprintf('where %s', $command));
        return $result->successful();
    }

    /**
     * Install Composer dependencies
     */
    private function installComposerDependencies(bool $force): void
    {
        $this->info('📦 Installing Composer dependencies...');

        if ($force && is_dir('vendor')) {
            $this->warn('🗑️ Removing existing vendor directory...');
            $this->deleteDirectory('vendor');
        }

        $command = 'composer install --optimize-autoloader';
        if (app()->environment('production')) {
            $command .= ' --no-dev';
        }

        $result = Process::run($command);

        if ($result->successful()) {
            $this->info('✅ Composer dependencies installed successfully');
        } else {
            $this->error('❌ Failed to install Composer dependencies');
            $this->line($result->errorOutput());
        }
    }

    /**
     * Install NPM dependencies
     */
    private function installNpmDependencies(bool $force): void
    {
        $this->info('📦 Installing NPM dependencies...');

        if ($force && is_dir('node_modules')) {
            $this->warn('🗑️ Removing existing node_modules directory...');
            $this->deleteDirectory('node_modules');
        }

        $result = Process::run('npm install');

        if ($result->successful()) {
            $this->info('✅ NPM dependencies installed successfully');
        } else {
            $this->error('❌ Failed to install NPM dependencies');
            $this->line($result->errorOutput());
        }
    }

    /**
     * Generate application key
     */
    private function generateAppKey(): void
    {
        if (empty(config('app.key'))) {
            $this->info('🔑 Generating application key...');
            $this->call('key:generate');
        } else {
            $this->info('✅ Application key already exists');
        }
    }

    /**
     * Run database migrations
     */
    private function runMigrations(): void
    {
        $this->info('🗄️ Running database migrations...');
        
        if ($this->confirm('Do you want to run database migrations?', true)) {
            $this->call('migrate', ['--graceful' => true]);
        } else {
            $this->warn('⚠️ Skipping database migrations');
        }
    }

    /**
     * Build assets
     */
    private function buildAssets(): void
    {
        $this->info('🏗️ Building frontend assets...');

        $command = app()->environment('production') ? 'npm run build' : 'npm run dev';
        $result = Process::run($command);

        if ($result->successful()) {
            $this->info('✅ Assets built successfully');
        } else {
            $this->error('❌ Failed to build assets');
            $this->line($result->errorOutput());
        }
    }

    /**
     * Clear application caches
     */
    private function clearCaches(): void
    {
        $this->info('🧹 Clearing application caches...');

        $this->call('config:clear');
        $this->call('route:clear');
        $this->call('view:clear');
        $this->call('cache:clear');

        $this->info('✅ Caches cleared successfully');
    }

    /**
     * Delete a directory recursively
     */
    private function deleteDirectory(string $dir): void
    {
        if (PHP_OS_FAMILY === 'Windows') {
            Process::run("rmdir /s /q \"{$dir}\"");
        } else {
            Process::run("rm -rf \"{$dir}\"");
        }
    }
}