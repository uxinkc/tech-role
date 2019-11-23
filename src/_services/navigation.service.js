/////// FAKE API ///////

const apiData = [
  {
    uid: "home-id",
    label: "Home",
    path: "/",
    hasChild: "false",
    columnClass: ""
  },
  {
    uid: "boilerplate-id",
    label: "Boilerplate",
    path: "/boilerplate",
    hasChild: "false",
    columnClass: ""
  },
  {
    uid: "component-demos-id",
    label: "Component Demos",
    path: "/demos",
    hasChild: "true",
    columnClass: "fsa-nav-global__list-item--multi-column",
    hasHeaders: "false",
    children: [
      {
        uid: "modal-growl-id",
        label: "Modal and Growl",
        path: "/demos/modal-growl",
        hasChild: "false",
      },
      {
        uid: "table-pagination-id",
        label: "Table and Pagination",
        path: "/demos/table",
        hasChild: "false",
      },
      {
        uid: "search-demo-id",
        label: "Search wtih RxJS",
        path: "/demos/search",
        hasChild: "false",
      },
      {
        uid: "investment-placement",
        label: "Investment Placement",
        path: "/reports/investment-placement",
        hasChild: "false",
      },
      
      {
        uid: "performance-management-id",
        label: "Performance Management",
        path: "/reports/performance-management",
        hasChild: "false",
      },
      {
        uid: "budgetary-max-funding-id",
        label: "Budgetary Max Funding",
        path: "/reports/budgetary-max-funding",
        hasChild: "false",
      },
      {
        uid: "premium-exposure-drive-id",
        label: "Premium Exposure Drive",
        path: "/reports/premium-exposure-drive",
        hasChild: "false",
      },
      {
        uid: "technology-plans-id",
        label: "Technology Plans",
        path: "/reports/technology-plans",
        hasChild: "false",
      },
      {
        uid: "drive-texture-mechanics-id",
        label: "Drive Texture Mechanics",
        path: "/reports/drive-texture-mechanics",
        hasChild: "false",
      },
      {
        uid: "unilateral-placement-shift-id",
        label: "Unilateral Placement Shift",
        path: "/reports/unilateral-placement-shift",
        hasChild: "false",
      },
      {
        uid: "investment-placements-id",
        label: "Investment Placements",
        path: "/reports/investment-placements",
        hasChild: "false",
      },
      {
        uid: "burden-investments-id",
        label: "Burden Investments",
        path: "/reports/burder-investments",
        hasChild: "false",
      },
      {
        uid: "performance-managements-id",
        label: "Performance Managements",
        path: "/reports/performance-managements",
        hasChild: "false",
      },
      {
        uid: "budgetary-max-fundings-id",
        label: "Budgetary Max Fundings",
        path: "/reports/budgetary-max-fundings",
        hasChild: "false",
      },
      {
        uid: "premium-exposure-drives-id",
        label: "Premium Exposure Drives",
        path: "/reports/premium-exposure-drives",
        hasChild: "false",
      },
      {
        uid: "technology-planner-id",
        label: "Technology Planner",
        path: "/reports/technology-planner",
        hasChild: "false",
      },
      {
        uid: "unilateral-placement-shifts-id",
        label: "Unilateral Placement Shifts",
        path: "/reports/unilateral-placement-shifts",
        hasChild: "false",
      },
    ],
  },
  {
    uid: "reports-id",
    label: "Reports",
    path: "/reports",
    hasChild: "true",
    columnClass: "fsa-nav-global__list-item--multi-column",
    hasHeaders: "true",
    children: [
      {
        uid: "reports-overview-id",
        header: "Cyclical Purchasing",
        group: [
          {
            uid: "cyclical-purchasing-overview-id",
            label: "Overview",
            path: "/reports/overview",
            hasChild: "false",
          },
          {
            uid: "rps-investment-placement-id",
            label: "Investment Placement",
            path: "/reports/investment-placement",
            hasChild: "false",
          },
          {
            uid: "cp-premium-exposure-drive-id",
            label: "Premium Exposure Drive",
            path: "/transaction/premium-exposure-drive",
            hasChild: "false",
          },
        ]
      },
      {
        uid: "overage-charge-stream-id",
        header: "Overage Charge Stream",
        group: [
          {
            uid: "overage-charge-stream-overview-id",
            label: "Overview",
            path: "/transaction/ocs-overview",
            hasChild: "false",
          },
          {
            uid: "ocs-budgetary-max-funding-id",
            label: "Reporting Configuration",
            path: "/transaction/ocs-reporting-configuration",
            hasChild: "false",
          },
          {
            uid: "ocs-investment-placement-id",
            label: "Investment Placement",
            path: "/transaction/ocs-investment-placement",
            hasChild: "false",
          },
          {
            uid: "ocs-burden-investment-id",
            label: "Burden Investment",
            path: "/transaction/ocs-burden-investment",
            hasChild: "false",
          },
          {
            uid: "ocs-performance-management-id",
            label: "Performance Management",
            path: "/transaction/ocs-performance-management",
            hasChild: "false",
          },
          {
            uid: "ocs-drive-texture-mechanics-id",
            label: "Drive Texture Mechanics",
            path: "/transaction/ocs-drive-textrure-mechanics",
            hasChild: "false",
          },
        ]
      },
      {
        uid: "fiscal-unit-development",
        header: "Fiscal Unit Development",
        group: [
          {
            uid: "fud-cyclical-purchasing-overview-id",
            label: "fud-Overview",
            path: "/transaction/fud-overview",
            hasChild: "false",
          },
          {
            uid: "fud-budgetary-max-funding-id",
            label: "Budgetary Max Funding",
            path: "/transaction/fud-budgetary-max-funding",
            hasChild: "false",
          },
          {
            uid: "fud-premium-exposure-drive-id",
            label: "Premium Exposure Drive",
            path: "/transaction/fud-premium-exposure-drive",
            hasChild: "false",
          },
          {
            uid: "fud-technology-plans-id",
            label: "Technology Plans",
            path: "/transaction/fud-technology-plans",
            hasChild: "false",
          },
        ]
      },
      {
        uid: "lorem-ipsum-dolor-id",
        header: "Lorem Ipsum Dolor",
        group: [
          {
            uid: "lorem-ipsum-dolor-id",
            label: "Overview",
            path: "/transaction/lid-overview",
            hasChild: "false",
          },
          {
            uid: "lid-budgetary-max-funding-id",
            label: "Budgetary Max Funding",
            path: "/transaction/lid-budgetary-max-funding",
            hasChild: "false",
          },
          {
            uid: "lid-premium-exposure-drive-id",
            label: "Premium Exposure Drive",
            path: "/transaction/lid-premium-exposure-drive",
            hasChild: "false",
          },
        ]
      }
    ]
  },
  {
    uid: "settings-id",
    label: "Settings",
    path: "/settings",
    hasChild: "false",
    columnClass: ""
  },

];

export const navigationService = {

  getNavigation( callback ){
    setTimeout( () => callback( apiData ) ,50);
  }
  
};