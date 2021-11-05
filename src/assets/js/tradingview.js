'use strict';

// import TradingView from "../charting_library/charting_library.min"
// const TradingView = require("../charting_library/charting_library.min")

const debugMode = false

// window.TradingView = TradingView

function getDefaultOptions(hideHeader) {
    if (!hideHeader) {
        hideHeader = true
    }
    const widgetOptions = {
        // symbol: this.symbol + ":" + this.contractNo,
        // symbol: 'AAPL',
        allow_symbol_change: false,
        // BEWARE: no trailing slash is expected in feed URL
        // datafeed: new window.Datafeeds.UDFCompatibleDatafeed(this.datafeedUrl),
        // datafeed: datafeed,
        dont_show_boolean_study_arguments: true,

        // interval: this.interval,
        container_id: "tv_chart_container",
        library_path: "/static/charting_library/",
        // toolbar_bg: '#041d3c',
        // locale: getLanguageFromURL() || "zh",
        locale: "zh",
        timezone: "Asia/Shanghai",
        // time_frames: [
        //     {text: "1m", resolution: "1"},
        //     {text: "1h", resolution: "60"},
        //     {text: "1d", resolution: "D"},
        // ],
        // debug: true,
        enabled_features: [
            // "charting_library_debug_mode",
            "move_logo_to_main_pane",
            "side_toolbar_in_fullscreen_mode",
            // "keep_left_toolbar_visible_on_small_screens",//左边栏app不用显示
            "disable_resolution_rebuild", // 从1转到日K的时候，会重建。。。
            // "study_templates",
            // "dont_show_boolean_study_arguments",
            // "hide_last_na_study_output"
        ],
        disabled_features: [
            "legend_context_menu",
            "widget_logo", // 禁用tradingview的logo
            "use_localstorage_for_settings",
            "header_symbol_search",
            "symbol_info",
            "display_market_status",
            "compare_symbol",
            "border_around_the_chart",
            "header_interval_dialog_button",
            "show_interval_dialog_on_key_press",
            "remove_library_container_border",
            // "left_toolbar",
            "header_undo_redo",
            "header_screenshot",
            "header_saveload",
            "volume_force_overlay",
            "context_menus",
            // "chart_zoom",//禁止滑动放大缩小
            "header_indicators",
            "timeframes_toolbar", // 禁用底部栏
            "header_compare",
            "header_chart_type",
            "header_settings",
            "adaptive_logo",
            "source_selection_markers",
            // "study_templates",
            // "study_dialog_search_control",
            // "study_market_minimized",
            "header_resolutions",
            "header_fullscreen_button",

            // "edit_buttons_in_legend" // ma的编辑框，加上指标，需要启用编辑按钮
        ],


        charts_storage_url: "https://saveload.tradingview.com",
        charts_storage_api_version: "1.1",
        client_id: "tradingview.com",
        user_id: "public_user_id",
        fullscreen: false,
        autosize: true,

        // indicators_file_name: "https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.10.0/js/md5.min.js", // 人畜无害的脚本

        // theme: this.theme,
        loading_screen: { backgroundColor: "#FFFFFF" },
        // custom_css_url: "/static/chart.css"

        // 自定义图标
        // logo: {image:'http://wintonefutures.com/pc/static/favicon.ico', link: 'http://wintonefutures.com/pc/'},
    };

    if (debugMode) {
        widgetOptions.debug = debugMode
        widgetOptions.enabled_features.push("charting_library_debug_mode")
    }

    if (hideHeader) {
        widgetOptions.disabled_features.push("header_widget")
    }

    return widgetOptions
}

export {
    getDefaultOptions,
    // TradingView
}
