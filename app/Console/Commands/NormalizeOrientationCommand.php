<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class NormalizeOrientationCommand extends Command
{
    protected $signature = 'mine:normalize-orientation {--dry-run : Sadece etkilenecek kayıtları gösterir}';
    protected $description = 'MinePath ve MineModel kayıtlarında orientation alanlarını horizontal/vertical -> yatay/dikey olarak normalize eder';

    public function handle(): int
    {
        $dry = $this->option('dry-run');
        $updatedPaths = 0; $updatedModels = 0;

        // Mine paths
        $paths = DB::table('mine_paths')->select('id','geometry','path_points','created_at','updated_at')->get();
        foreach ($paths as $p) {
            $dirty = false;
            $geo = $p->geometry ? json_decode($p->geometry, true) : [];
            if (isset($geo['orientation'])) {
                if ($geo['orientation'] === 'horizontal') { $geo['orientation'] = 'yatay'; $dirty = true; }
                elseif ($geo['orientation'] === 'vertical') { $geo['orientation'] = 'dikey'; $dirty = true; }
            }
            if ($dirty) {
                if ($dry) {
                    $this->line("[DRY] Path #{$p->id} -> orientation guncellenecek");
                } else {
                    DB::table('mine_paths')->where('id',$p->id)->update(['geometry'=>json_encode($geo), 'updated_at'=>now()]);
                    $updatedPaths++;
                }
            }
        }

        // Mine models (geometry veya configuration içinde orientation olabilir)
        if (DB::getSchemaBuilder()->hasTable('mine_models')) {
            $models = DB::table('mine_models')->select('id','geometry','configuration')->get();
            foreach ($models as $m) {
                $dirty = false;
                $geo = $m->geometry ? json_decode($m->geometry, true) : [];
                $conf = $m->configuration ? json_decode($m->configuration, true) : [];
                foreach (['geometry'=>&$geo,'configuration'=>&$conf] as $key=>&$ref) {
                    if (isset($ref['orientation'])) {
                        if ($ref['orientation']==='horizontal') { $ref['orientation']='yatay'; $dirty = true; }
                        elseif ($ref['orientation']==='vertical') { $ref['orientation']='dikey'; $dirty = true; }
                    }
                }
                if ($dirty) {
                    if ($dry) {
                        $this->line("[DRY] Model #{$m->id} -> orientation guncellenecek");
                    } else {
                        DB::table('mine_models')->where('id',$m->id)->update([
                            'geometry' => json_encode($geo),
                            'configuration' => json_encode($conf),
                            'updated_at' => now(),
                        ]);
                        $updatedModels++;
                    }
                }
            }
        }

        if (!$dry) {
            $this->info("Guncellenen Path: $updatedPaths, Model: $updatedModels");
        } else {
            $this->info('Dry run tamamlandı. --dry-run olmadan çalıştırarak güncelleyebilirsiniz.');
        }

        return Command::SUCCESS;
    }
}
