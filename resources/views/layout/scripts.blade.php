<script src="/theme-assets/vendors/js/vendors.min.js"></script>
<script src="/theme-assets/js/core/app-menu.js"></script>
<script src="/theme-assets/js/core/app.js"></script>
<script>
    $(window).on('load', function() {
        if (feather) {
            feather.replace({
                width: 14,
                height: 14
            });
        }

        @if (isset($pageInfo))
            const PAGE = "{{ $pageInfo['slug'] }}";
            if (PAGE) {
                $('#main-menu-navigation li').removeClass('active');
                $(`#main-menu-navigation li[slug="${PAGE}"]`).addClass('active');
            }
        @endif
    })
</script>
