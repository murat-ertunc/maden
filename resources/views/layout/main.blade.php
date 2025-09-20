<!DOCTYPE html>
<html class="loading bordered-layout" lang="en" data-layout="bordered-layout" data-textdirection="ltr">
<!-- BEGIN: Head-->

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0,minimal-ui">
    <meta name="author" content="ErtuncSoft">
    <title>{{ $pageInfo['title'] ?? '' }} | ErtuncSoft&reg;</title>
    <link rel="apple-touch-icon" href="/theme-assets/images/ico/apple-icon-120.png">
    <link rel="shortcut icon" type="image/x-icon" href="/theme-assets/images/ico/favicon.ico">
    @include('layout.styles')
    @stack('page-styles')
</head>
    <body class="vertical-layout vertical-menu-modern navbar-floating footer-static @if (!isset($pageInfo)) blank-page @endif" data-open="click" data-menu="vertical-menu-modern" data-col="">
        @if (isset($pageInfo))
            @include('layout.navbar')
            @include('layout.sidebar')
        @endif
        <div class="app-content content">
            <div class="content-overlay"></div>
            <div class="header-navbar-shadow"></div>
            <div class="content-wrapper">
                @include('layout.breadcrumb')
                <div class="content-body">
                    @yield('content')
                </div>
            </div>
        </div>
        @if (isset($pageInfo))
            @include('layout.footer')
        @endif
        @include('layout.scripts')
        @stack('page-scripts')
    </body>
</html>
