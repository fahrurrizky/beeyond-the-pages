const listSidebar = [
  {
    collapseRef: 'calendar-work-schedule',
    navText: 'Calendar & Work <br/> Schedule',
    iconClass: 'fa-regular fa-calendar-days text-primary text-sm opacity-10',
    items: [
      { to: { name: 'Calendar' }, text: 'Calendar' },
      { to: { name: 'Standard Shift Configuration' }, text: 'Standard Shift Configuration' },
    ],
  },
  {
    collapseRef: 'product-data',
    navText: 'Product Data',
    iconClass: 'fas fa-database text-primary text-sm opacity-10',
    items: [
      {
        refer: 'product',
        text: 'Product',
        childItems: [{ to: { name: 'Master Product' }, text: 'Master Product' }],
      },
      {
        refer: 'bom',
        text: 'BOM',
        childItems: [
          { to: { name: 'Product Family BOM' }, text: 'Product Family BOM' },
          { to: { name: 'Product BOM' }, text: 'Product BOM' },
        ],
      },
      { to: { name: 'VIN' }, text: 'VIN' },
      { to: { name: 'CV QC' }, text: 'CV QC' },
    ],
  },
  {
    collapseRef: 'resource-data',
    navText: 'Resource Data',
    iconClass: 'fa-solid fa-file-lines text-primary text-sm opacity-10',
    items: [
      {
        refer: 'materials-data',
        text: 'Materials Data',
        childItems: [
          { to: { name: 'Parts' }, text: 'Parts' },
          { to: { name: 'Container' }, text: 'Container' },
        ],
      },
      {
        refer: 'repacking',
        text: 'Repacking',
        childItems: [
          { to: { name: 'Repacked Part Set' }, text: 'Repacked Part Set' },
          { to: { name: 'Kanban Repacking' }, text: 'Kanban Repacking' },
        ],
      },
    ],
  },
  {
    collapseRef: 'supplier-management',
    navText: 'Supplier Management',
    iconClass: 'fa-solid fa-file-signature text-primary text-sm opacity-10',
    items: [{ to: { name: 'Supplier Profile & Contact' }, text: 'Supplier Profile & Contact' }],
  },
  {
    collapseRef: 'sales-requirement-planning',
    navText: 'Sales Requirement <br/> Planning',
    iconClass: 'fa-solid fa-list-check text-primary text-sm opacity-10',
    items: [
      { to: { name: 'Product Purchase Request' }, text: 'SRP Status Summary' },
      { to: { name: 'Schedule Summary' }, text: 'SRP Schedule Summary' },
      { to: { name: 'Sales Delivery Order', title: 'Sales Delivery Plan' }, text: 'Sales Delivery Plan' },
      { to: { name: 'Product Delivery Note' }, text: 'Sales Delivery Order' },
      // {
      //   refer: 'product-purchase-order',
      //   text: 'Product Purchase Order <br/> & Delivery Schedule',
      //   childItems: [{ to: { name: 'Product Delivery Note' }, text: 'Product Delivery Note' }],
      // },
    ],
  },
  {
    collapseRef: 'material-requirement-planning',
    navText: 'Material Requirement <br/> Planning',
    iconClass: 'fa-solid fa-list-check text-primary text-sm opacity-10',
    items: [
      { to: { name: 'Material Requirement Simulation' }, text: 'Material Purchase Request' },
      { to: { name: 'Delivery Order Schedule' }, text: 'Delivery Order Schedule' },
      { to: { name: 'Material Purchase Request' }, text: 'Material Fulfillment Ratio' },
      {
        refer: 'material-delivery-receiving-schedule',
        text: 'Material Delivery <br/> Receiving Schedule ',
        childItems: [
          { to: { name: 'Delivery Notes' }, text: 'Delivery Notes' },
          { to: { name: 'Log Incoming' }, text: 'Log Incoming' },
        ],
      },
    ],
  },
  {
    collapseRef: 'advanced-planning-scheduling',
    navText: 'Advanced Planning <br/> & Scheduling',
    iconClass: 'fa-solid fa-calendar-check text-primary text-sm opacity-10',
    items: [
      { to: { name: 'Production Order Release & Management' }, text: 'Production Plan' },
      { to: { name: 'Production Order Summary' }, text: 'Production Order' },
      { to: { name: 'Operations Status' }, text: 'Production Status' },
    ],
  },
  {
    collapseRef: 'work-order',
    navText: 'Work Order',
    iconClass: 'fa-solid fa-folder-tree text-primary text-sm opacity-10',
    items: [{ to: { name: 'Work Order' }, text: 'Work Order' }],
  },
  {
    collapseRef: 'warehouse-storage-retrieval-system',
    navText: 'Warehouse, Storage <br/> & Retrieval System',
    iconClass: 'fa-solid fa-warehouse text-primary text-sm opacity-10',
    items: [
      { to: { name: 'Summary Inventory Storage' }, text: 'Summary Inventory <br/> Storage' },
      { to: { name: 'Storage & Inventory Location' }, text: 'Storage & Inventory <br/> Location' },
    ],
  },
  {
    collapseRef: 'log-stock-entry-erp',
    navText: 'Log Stock Entry ERP',
    iconClass: 'fas fa-database text-primary text-sm opacity-10',
    items: [{ to: { name: 'Log Supply & Transfer Stock' }, text: 'Log Supply & Transfer Stock' }],
  },
  {
    collapseRef: 'repair',
    navText: 'Repair',
    iconClass: 'fa fa-recycle text-primary text-sm opacity-10',
    items: [{ to: { name: 'Repair' }, text: 'Repair' }],
  },
];

export default listSidebar;
