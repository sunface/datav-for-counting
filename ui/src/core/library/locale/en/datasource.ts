const datasource = {
    add: 'Add data source',
    edit: 'Edit data source',
    choose: 'Choose a data source type',
    timeSeriesCategory: 'Time series databases',
    loggingCategory: 'Logging & document databases',
    tracingCategory: 'Distributed tracing',
    isWorking: 'Data source is working',
    testFailed: 'Test failed',
    delete: 'Delete data source',
    deleteTitle: 'Are you sure you want to delete this data source?',
    // datasources
    nameTooltip: 'The name is used when you select the data source in panels. The Default data source is ' +
    'preselected in new panels.',
    whitelistCookies : 'Whitelisted Cookies',
    whitelistCookiesTooltip: "Backend proxy deletes forwarded cookies by default. Specify cookies by name that should be forwarded to the data source.",
    customHttpHeader: 'Custom HTTP Headers',
    addHeader: 'Add header',
    scrapeInterval: "Scrape interval",
    queryTimeout: "Query timeout",
    httpMethod: "HTTP Method",
    scrapeIntervalTooltip: "Set this to the typical scrape and evaluation interval configured in Prometheus. Defaults to 15s.",
    queryTimeoutTooltip: "Set the Prometheus query timeout.",
    httpMethodTooltip: "Specify the HTTP Method to query Prometheus. (POST is only available in Prometheus >= v2.1.0)",

    // prometheus
    promLegendTips: `Controls the name of the time series, using name or pattern. For example
    {{hostname}} will be replaced with label value for the label hostname.`,
    promMinStepTips: `An additional lower limit for the step parameter of the Prometheus query and for the{' '}
    <code>$__interval</code> variable. The limit is absolute and not modified by the "Resolution" setting.`,
    promTips: 'Link to Graph in Prometheus',
    promInstantTips: 'Only the most recent values are queried',
    promLineTips: 'show/hide graph lines',
    promLineWidthTips: 'control line width of the graph',
    promAreaFillTips: 'fill the graph area with colors',
    promFillGradientTips: 'fill the graph area with gradient colors',
    promStairCaseTips: 'make the graph looks like staircast',
    promBarTips: 'show/hide graph bars',
    promPointTips: 'show/hide graph points',
    promPointRadiusTips: 'point radius in pixels',
    promStackTips : 'display summary values in stacked format, should be used with bar enabled',
    promStackPerTips: 'make the stack show percentage instead of summary value',
    promNullTips:'how null points should be handled',
    promDecimalTips: 'Override automatic decimal precision for legend and tooltips',
    promTooltipMode: 'controls the values showing when hover on graph points',
    promTooltipOrder: 'controls the values order when hover on graph points',
    promTooltipStack: 'controls the values when hover on stack graph points',
    promUnitTips:'set unit for graph values',
    promScaleTips: 'a set of numbers that help to measure values',
    promMinYTips: 'set min scale value showing in  y-axis',
    promMaxYTips: 'set max scale value showing in  y-axis',
}

export default datasource