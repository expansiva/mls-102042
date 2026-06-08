export const modulePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "module",
  "artifactId": "barbershopPro",
  "moduleName": "barbershopPro",
  "status": "draft",
  "source": {
    "agentName": "agentFinalizeSolutionPlan",
    "stepId": 11,
    "planId": "plan-finalize-solution-plan"
  },
  "data": {
    "module": {
      "moduleName": "barbershopPro",
      "purpose": "Enable fast booking, staff performance visibility, and retail sales management for small US barbershops and salons.",
      "businessDomain": "barbershopManagement",
      "languages": [
        "en",
        "pt-br"
      ],
      "visualStyle": {
        "tone": "Modern and clean",
        "layout": "Dashboard-first with quick actions",
        "palette": [
          "#111827",
          "#1F2937",
          "#3B82F6",
          "#10B981",
          "#F3F4F6"
        ]
      }
    },
    "actors": [
      {
        "actorId": "owner",
        "title": "Owner",
        "description": "Runs the business, monitors revenue, staff performance, and overall operations."
      },
      {
        "actorId": "manager",
        "title": "Manager",
        "description": "Manages daily operations, bookings, staff schedules, and inventory."
      },
      {
        "actorId": "barberStylist",
        "title": "Barber/Stylist",
        "description": "Provides services, views schedule, and tracks commissions."
      },
      {
        "actorId": "receptionist",
        "title": "Receptionist",
        "description": "Handles booking, customer check-in, and checkout."
      }
    ],
    "capabilities": [
      {
        "capabilityId": "manageCustomers",
        "title": "Manage customers",
        "description": "Create, update, and view customer profiles with visit history.",
        "actor": "receptionist",
        "priority": "now"
      },
      {
        "capabilityId": "manageStaff",
        "title": "Manage staff",
        "description": "Maintain staff profiles, roles, schedules, and availability.",
        "actor": "manager",
        "priority": "now"
      },
      {
        "capabilityId": "manageServices",
        "title": "Manage services",
        "description": "Define service catalog with duration and price.",
        "actor": "manager",
        "priority": "now"
      },
      {
        "capabilityId": "bookAppointments",
        "title": "Book appointments",
        "description": "Create, reschedule, and cancel appointments based on stylist availability.",
        "actor": "receptionist",
        "priority": "now"
      },
      {
        "capabilityId": "checkInAndCheckout",
        "title": "Check-in and checkout",
        "description": "Record completed services, retail sales, and payments to generate sales records.",
        "actor": "receptionist",
        "priority": "now"
      },
      {
        "capabilityId": "trackInventory",
        "title": "Track inventory",
        "description": "Maintain product catalog and stock levels for retail sales.",
        "actor": "manager",
        "priority": "now"
      },
      {
        "capabilityId": "calculateCommissions",
        "title": "Calculate commissions",
        "description": "Compute commissions for services and products based on defined rules.",
        "actor": "owner",
        "priority": "now"
      },
      {
        "capabilityId": "viewDashboard",
        "title": "View dashboard",
        "description": "See today’s bookings, staff utilization, daily revenue, and key metrics.",
        "actor": "owner",
        "priority": "now"
      },
      {
        "capabilityId": "viewStaffPerformance",
        "title": "View staff performance",
        "description": "Review performance and commissions per staff member.",
        "actor": "manager",
        "priority": "now"
      },
      {
        "capabilityId": "llmRecommendations",
        "title": "LLM recommendations",
        "description": "Suggest upsell services for a customer and best time slots for walk-ins today.",
        "actor": "receptionist",
        "priority": "soon"
      }
    ],
    "ontology": {
      "entities": {
        "Customer": {
          "title": "Customer",
          "description": "Person receiving services and purchasing retail products."
        },
        "StaffMember": {
          "title": "Stylist/Barber",
          "description": "Staff who performs services and earns commissions."
        },
        "Service": {
          "title": "Service",
          "description": "Catalog item with name, duration, and price used in appointments and upsell."
        },
        "Appointment": {
          "title": "Appointment",
          "description": "Scheduled service commitment linking customer, staff, service, and time.",
          "lifecycleStates": [
            "draft",
            "booked",
            "checkedIn",
            "completed",
            "cancelled",
            "noShow"
          ]
        },
        "Product": {
          "title": "Product",
          "description": "Retail inventory item sold to customers."
        },
        "Sale": {
          "title": "Sale",
          "description": "Transaction for completed services and retail products linked to staff and customer."
        },
        "CommissionRule": {
          "title": "Commission rule",
          "description": "Configurable rule used to calculate staff commissions for services and products."
        },
        "InventoryLedger": {
          "title": "Inventory ledger entry",
          "description": "Stock change record for product adjustments and sales consumption."
        },
        "AvailabilitySlot": {
          "title": "Availability slot",
          "description": "Staff availability interval used for booking and walk-in suggestions."
        }
      }
    },
    "rules": [
      {
        "ruleId": "appointmentMustHaveCustomerStaffService",
        "title": "Appointment requires customer, staff, and service",
        "description": "An appointment must reference exactly one customer, one staff member, and at least one service.",
        "appliesTo": [
          "Appointment"
        ],
        "layer": "layer_1"
      },
      {
        "ruleId": "appointmentNoOverlapPerStaff",
        "title": "No overlapping appointments per staff",
        "description": "Booked or checked-in appointments cannot overlap for the same staff member.",
        "appliesTo": [
          "Appointment",
          "AvailabilitySlot"
        ],
        "layer": "layer_3"
      },
      {
        "ruleId": "serviceDurationPriceRequired",
        "title": "Service duration and price required",
        "description": "All services must include a duration and price greater than zero.",
        "appliesTo": [
          "Service"
        ],
        "layer": "layer_1"
      },
      {
        "ruleId": "saleRequiresCompletion",
        "title": "Sale requires completed appointment or retail-only flag",
        "description": "A sale must be linked to a completed appointment or explicitly marked as retail-only.",
        "appliesTo": [
          "Sale",
          "Appointment"
        ],
        "layer": "layer_3"
      },
      {
        "ruleId": "inventoryCannotGoNegative",
        "title": "Inventory cannot go negative",
        "description": "Product stock levels cannot drop below zero when applying sales or adjustments.",
        "appliesTo": [
          "Product",
          "InventoryLedger"
        ],
        "layer": "layer_3"
      },
      {
        "ruleId": "commissionCalculationRequired",
        "title": "Commission calculation required for completed sales",
        "description": "Commissions are computed whenever a sale is recorded and linked to staff.",
        "appliesTo": [
          "Sale",
          "CommissionRule",
          "StaffMember"
        ],
        "layer": "layer_3"
      },
      {
        "ruleId": "singleLocationScope",
        "title": "Single location scope",
        "description": "All records belong to a single location and do not require multi-branch routing.",
        "appliesTo": [
          "Appointment",
          "StaffMember",
          "Customer",
          "Sale",
          "Product",
          "Service"
        ],
        "layer": "layer_1"
      }
    ],
    "relationships": [
      {
        "relationshipId": "appointmentCustomer",
        "fromEntity": "Appointment",
        "toEntity": "Customer",
        "type": "manyToOne",
        "description": "Each appointment is booked for one customer."
      },
      {
        "relationshipId": "appointmentStaff",
        "fromEntity": "Appointment",
        "toEntity": "StaffMember",
        "type": "manyToOne",
        "description": "Each appointment is assigned to one staff member."
      },
      {
        "relationshipId": "appointmentService",
        "fromEntity": "Appointment",
        "toEntity": "Service",
        "type": "manyToMany",
        "description": "Appointments include one or more services."
      },
      {
        "relationshipId": "saleCustomer",
        "fromEntity": "Sale",
        "toEntity": "Customer",
        "type": "manyToOne",
        "description": "Sales are attributed to the purchasing customer."
      },
      {
        "relationshipId": "saleStaff",
        "fromEntity": "Sale",
        "toEntity": "StaffMember",
        "type": "manyToOne",
        "description": "Sales are attributed to the staff member who provided service or sold products."
      },
      {
        "relationshipId": "saleAppointment",
        "fromEntity": "Sale",
        "toEntity": "Appointment",
        "type": "oneToOne",
        "description": "A sale may be linked to a completed appointment."
      },
      {
        "relationshipId": "saleProduct",
        "fromEntity": "Sale",
        "toEntity": "Product",
        "type": "manyToMany",
        "description": "Sales include zero or more products."
      },
      {
        "relationshipId": "commissionRuleStaff",
        "fromEntity": "CommissionRule",
        "toEntity": "StaffMember",
        "type": "optionalManyToMany",
        "description": "Commission rules may be defined per staff member."
      },
      {
        "relationshipId": "inventoryLedgerProduct",
        "fromEntity": "InventoryLedger",
        "toEntity": "Product",
        "type": "manyToOne",
        "description": "Inventory ledger entries apply to a product."
      },
      {
        "relationshipId": "availabilityStaff",
        "fromEntity": "AvailabilitySlot",
        "toEntity": "StaffMember",
        "type": "manyToOne",
        "description": "Availability slots belong to a staff member."
      }
    ],
    "userActions": [
      {
        "actionId": "createCustomer",
        "title": "Create customer",
        "actor": "receptionist",
        "capabilityId": "manageCustomers",
        "description": "Add a new customer profile.",
        "commandType": "bffCommand",
        "affectedEntities": [
          "Customer"
        ],
        "rulesApplied": [
          "singleLocationScope"
        ]
      },
      {
        "actionId": "updateCustomer",
        "title": "Update customer",
        "actor": "receptionist",
        "capabilityId": "manageCustomers",
        "description": "Edit customer contact details and preferences.",
        "commandType": "bffCommand",
        "affectedEntities": [
          "Customer"
        ],
        "rulesApplied": [
          "singleLocationScope"
        ]
      },
      {
        "actionId": "viewCustomerHistory",
        "title": "View customer visit history",
        "actor": "receptionist",
        "capabilityId": "manageCustomers",
        "description": "Review appointments and sales for a customer.",
        "commandType": "bffQuery",
        "affectedEntities": [
          "Appointment",
          "Sale"
        ]
      },
      {
        "actionId": "createStaffMember",
        "title": "Create staff member",
        "actor": "manager",
        "capabilityId": "manageStaff",
        "description": "Add a staff profile with role and commission settings.",
        "commandType": "bffCommand",
        "affectedEntities": [
          "StaffMember",
          "CommissionRule"
        ],
        "rulesApplied": [
          "singleLocationScope"
        ]
      },
      {
        "actionId": "updateStaffSchedule",
        "title": "Update staff schedule",
        "actor": "manager",
        "capabilityId": "manageStaff",
        "description": "Set availability slots for a staff member.",
        "commandType": "bffCommand",
        "affectedEntities": [
          "AvailabilitySlot",
          "StaffMember"
        ],
        "rulesApplied": [
          "singleLocationScope"
        ]
      },
      {
        "actionId": "createService",
        "title": "Create service",
        "actor": "manager",
        "capabilityId": "manageServices",
        "description": "Add a service with duration and price.",
        "commandType": "bffCommand",
        "affectedEntities": [
          "Service"
        ],
        "rulesApplied": [
          "serviceDurationPriceRequired",
          "singleLocationScope"
        ]
      },
      {
        "actionId": "updateService",
        "title": "Update service",
        "actor": "manager",
        "capabilityId": "manageServices",
        "description": "Edit service details and pricing.",
        "commandType": "bffCommand",
        "affectedEntities": [
          "Service"
        ],
        "rulesApplied": [
          "serviceDurationPriceRequired",
          "singleLocationScope"
        ]
      },
      {
        "actionId": "bookAppointment",
        "title": "Book appointment",
        "actor": "receptionist",
        "capabilityId": "bookAppointments",
        "description": "Create an appointment using selected customer, services, staff, and time slot.",
        "commandType": "bffCommand",
        "affectedEntities": [
          "Appointment",
          "AvailabilitySlot"
        ],
        "rulesApplied": [
          "appointmentMustHaveCustomerStaffService",
          "appointmentNoOverlapPerStaff",
          "singleLocationScope"
        ]
      },
      {
        "actionId": "rescheduleAppointment",
        "title": "Reschedule appointment",
        "actor": "receptionist",
        "capabilityId": "bookAppointments",
        "description": "Change appointment time or staff assignment.",
        "commandType": "bffCommand",
        "affectedEntities": [
          "Appointment",
          "AvailabilitySlot"
        ],
        "rulesApplied": [
          "appointmentNoOverlapPerStaff",
          "singleLocationScope"
        ]
      },
      {
        "actionId": "cancelAppointment",
        "title": "Cancel appointment",
        "actor": "receptionist",
        "capabilityId": "bookAppointments",
        "description": "Cancel an appointment with a reason.",
        "commandType": "bffCommand",
        "affectedEntities": [
          "Appointment"
        ],
        "rulesApplied": [
          "singleLocationScope"
        ]
      },
      {
        "actionId": "checkInAppointment",
        "title": "Check in appointment",
        "actor": "receptionist",
        "capabilityId": "checkInAndCheckout",
        "description": "Mark customer as arrived for the appointment.",
        "commandType": "bffCommand",
        "affectedEntities": [
          "Appointment"
        ],
        "rulesApplied": [
          "appointmentMustHaveCustomerStaffService",
          "singleLocationScope"
        ]
      },
      {
        "actionId": "completeAppointment",
        "title": "Complete appointment",
        "actor": "receptionist",
        "capabilityId": "checkInAndCheckout",
        "description": "Mark appointment completed before checkout.",
        "commandType": "bffCommand",
        "affectedEntities": [
          "Appointment"
        ],
        "rulesApplied": [
          "singleLocationScope"
        ]
      },
      {
        "actionId": "recordSale",
        "title": "Record sale",
        "actor": "receptionist",
        "capabilityId": "checkInAndCheckout",
        "description": "Record services and retail products sold at checkout.",
        "commandType": "bffCommand",
        "affectedEntities": [
          "Sale",
          "InventoryLedger",
          "Product",
          "CommissionRule"
        ],
        "rulesApplied": [
          "saleRequiresCompletion",
          "inventoryCannotGoNegative",
          "commissionCalculationRequired",
          "singleLocationScope"
        ]
      },
      {
        "actionId": "adjustInventory",
        "title": "Adjust inventory",
        "actor": "manager",
        "capabilityId": "trackInventory",
        "description": "Apply manual stock adjustments.",
        "commandType": "bffCommand",
        "affectedEntities": [
          "InventoryLedger",
          "Product"
        ],
        "rulesApplied": [
          "inventoryCannotGoNegative",
          "singleLocationScope"
        ]
      },
      {
        "actionId": "runCommissionCalculation",
        "title": "Run commission calculation",
        "actor": "owner",
        "capabilityId": "calculateCommissions",
        "description": "Recalculate commissions for a date range.",
        "commandType": "bffCommand",
        "affectedEntities": [
          "Sale",
          "CommissionRule",
          "StaffMember"
        ],
        "rulesApplied": [
          "commissionCalculationRequired",
          "singleLocationScope"
        ]
      },
      {
        "actionId": "viewDashboard",
        "title": "View dashboard",
        "actor": "owner",
        "capabilityId": "viewDashboard",
        "description": "Open dashboard KPIs and operational summary.",
        "commandType": "bffQuery",
        "affectedEntities": [
          "Appointment",
          "Sale",
          "StaffMember"
        ]
      },
      {
        "actionId": "viewStaffPerformance",
        "title": "View staff performance",
        "actor": "manager",
        "capabilityId": "viewStaffPerformance",
        "description": "Review staff KPIs and commission summaries.",
        "commandType": "bffQuery",
        "affectedEntities": [
          "Sale",
          "StaffMember",
          "CommissionRule"
        ]
      },
      {
        "actionId": "requestUpsellSuggestion",
        "title": "Request upsell suggestions",
        "actor": "receptionist",
        "capabilityId": "llmRecommendations",
        "description": "Generate recommended add-on services for a customer.",
        "commandType": "bffCommand",
        "affectedEntities": [
          "Customer",
          "Service",
          "Sale"
        ],
        "rulesApplied": [
          "singleLocationScope"
        ]
      },
      {
        "actionId": "requestWalkInSlots",
        "title": "Request walk-in time slots",
        "actor": "receptionist",
        "capabilityId": "llmRecommendations",
        "description": "Generate best time slots for walk-ins today.",
        "commandType": "bffCommand",
        "affectedEntities": [
          "AvailabilitySlot",
          "Appointment",
          "StaffMember"
        ],
        "rulesApplied": [
          "singleLocationScope"
        ]
      }
    ],
    "approvedArtifacts": {
      "pages": [
        {
          "signal": "dashboardPage",
          "title": "Dashboard",
          "reason": "Needs today bookings, staff utilization, daily revenue, and basic metrics.",
          "priority": "now",
          "actor": "owner",
          "artifactType": "page",
          "references": [
            "metricTableOperations"
          ],
          "rulesApplied": [
            "singleLocationScope"
          ]
        },
        {
          "signal": "customerListPage",
          "title": "Customer list",
          "reason": "Customer management with visit history.",
          "priority": "now",
          "actor": "receptionist",
          "artifactType": "page",
          "references": [
            "Customer",
            "Appointment",
            "Sale"
          ],
          "rulesApplied": [
            "singleLocationScope"
          ]
        },
        {
          "signal": "appointmentBookingPage",
          "title": "Appointment booking",
          "reason": "Fast booking with stylist availability.",
          "priority": "now",
          "actor": "receptionist",
          "artifactType": "page",
          "references": [
            "Appointment",
            "AvailabilitySlot",
            "Service",
            "StaffMember"
          ],
          "rulesApplied": [
            "appointmentNoOverlapPerStaff",
            "appointmentMustHaveCustomerStaffService",
            "singleLocationScope"
          ]
        },
        {
          "signal": "staffPerformancePage",
          "title": "Staff performance & commissions",
          "reason": "Performance tracking and commission visibility.",
          "priority": "now",
          "actor": "manager",
          "artifactType": "page",
          "references": [
            "metricTablePerformance",
            "CommissionRule",
            "Sale"
          ],
          "rulesApplied": [
            "commissionCalculationRequired",
            "singleLocationScope"
          ]
        },
        {
          "signal": "inventoryPage",
          "title": "Inventory",
          "reason": "Retail product and stock tracking.",
          "priority": "now",
          "actor": "manager",
          "artifactType": "page",
          "references": [
            "Product",
            "InventoryLedger"
          ],
          "rulesApplied": [
            "inventoryCannotGoNegative",
            "singleLocationScope"
          ]
        },
        {
          "signal": "serviceCatalogPage",
          "title": "Service catalog",
          "reason": "Manage service definitions used in bookings.",
          "priority": "now",
          "actor": "manager",
          "artifactType": "page",
          "references": [
            "Service"
          ],
          "rulesApplied": [
            "serviceDurationPriceRequired",
            "singleLocationScope"
          ]
        },
        {
          "signal": "staffSchedulePage",
          "title": "Staff schedule",
          "reason": "Define availability for accurate booking.",
          "priority": "now",
          "actor": "manager",
          "artifactType": "page",
          "references": [
            "AvailabilitySlot",
            "StaffMember"
          ],
          "rulesApplied": [
            "singleLocationScope"
          ]
        },
        {
          "signal": "salesCheckoutPage",
          "title": "Checkout / Sales",
          "reason": "Capture service completion, retail sales, and payments.",
          "priority": "now",
          "actor": "receptionist",
          "artifactType": "page",
          "references": [
            "Sale",
            "Appointment",
            "Product"
          ],
          "rulesApplied": [
            "saleRequiresCompletion",
            "inventoryCannotGoNegative",
            "commissionCalculationRequired",
            "singleLocationScope"
          ]
        },
        {
          "signal": "metricsAdminDashboardPage",
          "title": "Metrics admin dashboard",
          "reason": "Initial metrics dashboard requested to monitor KPIs.",
          "priority": "now",
          "actor": "owner",
          "artifactType": "page",
          "references": [
            "metricTableOperations",
            "metricTablePerformance"
          ],
          "rulesApplied": [
            "singleLocationScope"
          ]
        },
        {
          "signal": "adminSettingsPage",
          "title": "Admin settings",
          "reason": "Configure commission rules, business settings, and roles.",
          "priority": "soon",
          "actor": "owner",
          "artifactType": "page",
          "references": [
            "CommissionRule",
            "StaffMember"
          ],
          "rulesApplied": [
            "singleLocationScope"
          ]
        }
      ],
      "workflows": [
        {
          "signal": "appointmentBookingWorkflow",
          "title": "Appointment booking",
          "reason": "Create/reschedule/cancel appointments with availability checks.",
          "priority": "now",
          "actor": "receptionist",
          "artifactType": "workflow",
          "references": [
            "Appointment",
            "AvailabilitySlot"
          ],
          "rulesApplied": [
            "appointmentNoOverlapPerStaff"
          ]
        },
        {
          "signal": "checkInCheckoutWorkflow",
          "title": "Check-in and checkout",
          "reason": "Complete appointments, add retail items, and record sales.",
          "priority": "now",
          "actor": "receptionist",
          "artifactType": "workflow",
          "references": [
            "Appointment",
            "Sale",
            "Product"
          ],
          "rulesApplied": [
            "saleRequiresCompletion",
            "inventoryCannotGoNegative"
          ]
        },
        {
          "signal": "inventoryAdjustmentWorkflow",
          "title": "Inventory adjustment",
          "reason": "Update stock on sales and manual adjustments.",
          "priority": "now",
          "actor": "manager",
          "artifactType": "workflow",
          "references": [
            "InventoryLedger",
            "Product"
          ],
          "rulesApplied": [
            "inventoryCannotGoNegative"
          ]
        },
        {
          "signal": "commissionCalculationWorkflow",
          "title": "Commission calculation",
          "reason": "Compute commissions per sale or period based on rules.",
          "priority": "now",
          "actor": "owner",
          "artifactType": "workflow",
          "references": [
            "CommissionRule",
            "Sale",
            "StaffMember"
          ]
        },
        {
          "signal": "walkInSlotSuggestionWorkflow",
          "title": "Walk-in time slot suggestion",
          "reason": "Provide best time slots for walk-ins using availability and utilization.",
          "priority": "soon",
          "actor": "receptionist",
          "artifactType": "workflow",
          "references": [
            "AvailabilitySlot",
            "Appointment",
            "StaffMember"
          ]
        },
        {
          "signal": "upsellSuggestionWorkflow",
          "title": "Upsell suggestion",
          "reason": "Provide suggested add-on services for a customer.",
          "priority": "soon",
          "actor": "receptionist",
          "artifactType": "workflow",
          "references": [
            "Customer",
            "Service",
            "Sale"
          ]
        }
      ],
      "plugins": [
        {
          "signal": "llmUpsellPlugin",
          "title": "LLM upsell suggestions",
          "reason": "Supports upsell recommendation feature.",
          "priority": "soon",
          "actor": "receptionist",
          "artifactType": "plugin",
          "references": [
            "upsellSuggestionWorkflow"
          ]
        },
        {
          "signal": "llmWalkInSlotPlugin",
          "title": "LLM walk-in slots",
          "reason": "Supports best time slot suggestions for walk-ins.",
          "priority": "soon",
          "actor": "receptionist",
          "artifactType": "plugin",
          "references": [
            "walkInSlotSuggestionWorkflow"
          ]
        }
      ],
      "agents": [
        {
          "signal": "recommendationAgent",
          "title": "Recommendation agent",
          "reason": "Generates upsell and walk-in time slot suggestions using shop data.",
          "priority": "soon",
          "actor": "receptionist",
          "artifactType": "agent",
          "references": [
            "Customer",
            "Appointment",
            "Service",
            "Product",
            "AvailabilitySlot"
          ]
        }
      ],
      "horizontalModules": [
        {
          "signal": "rbacModule",
          "title": "Role-based access control",
          "reason": "Supports Owner, Manager, Barber/Stylist, Receptionist roles.",
          "priority": "now",
          "actor": "owner",
          "artifactType": "horizontalModule",
          "references": [
            "StaffMember"
          ]
        },
        {
          "signal": "auditLogModule",
          "title": "Audit log",
          "reason": "Track booking, sales, and commission changes.",
          "priority": "soon",
          "actor": "owner",
          "artifactType": "horizontalModule",
          "references": [
            "Appointment",
            "Sale",
            "CommissionRule"
          ]
        },
        {
          "signal": "notificationModule",
          "title": "Notifications",
          "reason": "Confirm bookings and schedule changes.",
          "priority": "soon",
          "actor": "receptionist",
          "artifactType": "horizontalModule",
          "references": [
            "Appointment"
          ]
        }
      ],
      "mdm": [
        {
          "signal": "customerMdm",
          "title": "Customer",
          "reason": "Core master data for visit history, booking, and upsell.",
          "priority": "now",
          "actor": "receptionist",
          "artifactType": "mdm"
        },
        {
          "signal": "staffMdm",
          "title": "Stylist/Barber",
          "reason": "Core master data for availability, bookings, and commissions.",
          "priority": "now",
          "actor": "manager",
          "artifactType": "mdm"
        },
        {
          "signal": "serviceMdm",
          "title": "Service",
          "reason": "Core master data for pricing, duration, and upsell logic.",
          "priority": "now",
          "actor": "manager",
          "artifactType": "mdm"
        },
        {
          "signal": "productMdm",
          "title": "Product",
          "reason": "Core master data for retail inventory and sales.",
          "priority": "now",
          "actor": "manager",
          "artifactType": "mdm"
        },
        {
          "signal": "appointmentMdm",
          "title": "Appointment",
          "reason": "Core master data for booking and service delivery lifecycle.",
          "priority": "now",
          "actor": "receptionist",
          "artifactType": "mdm"
        },
        {
          "signal": "saleMdm",
          "title": "Sale",
          "reason": "Core master data for retail and service transactions and commissions.",
          "priority": "now",
          "actor": "receptionist",
          "artifactType": "mdm"
        },
        {
          "signal": "commissionRuleMdm",
          "title": "Commission rule",
          "reason": "Stable commission definitions used across staff and services.",
          "priority": "now",
          "actor": "owner",
          "artifactType": "mdm"
        }
      ],
      "metricTables": [
        {
          "signal": "metricTableOperations",
          "title": "Operations metrics table",
          "reason": "Powers today’s bookings, daily revenue, and staff utilization.",
          "priority": "now",
          "actor": "owner",
          "artifactType": "metricTable",
          "references": [
            "Appointment",
            "Sale",
            "StaffMember"
          ]
        },
        {
          "signal": "metricTablePerformance",
          "title": "Performance metrics table",
          "reason": "Powers commission totals and staff performance summaries.",
          "priority": "now",
          "actor": "owner",
          "artifactType": "metricTable",
          "references": [
            "Sale",
            "StaffMember",
            "CommissionRule"
          ]
        }
      ],
      "metricDashboards": [
        {
          "signal": "metricDashboardAdmin",
          "title": "Admin metrics dashboard",
          "reason": "Initial metrics dashboard requested to monitor KPIs.",
          "priority": "now",
          "actor": "owner",
          "artifactType": "metricDashboard",
          "references": [
            "metricTableOperations",
            "metricTablePerformance"
          ]
        }
      ],
      "usecaseEntities": [
        {
          "signal": "createAppointmentUsecase",
          "title": "Create appointment",
          "reason": "Writes appointment records and updates availability.",
          "priority": "now",
          "actor": "receptionist",
          "artifactType": "usecaseEntity",
          "references": [
            "Appointment",
            "AvailabilitySlot"
          ],
          "rulesApplied": [
            "appointmentMustHaveCustomerStaffService",
            "appointmentNoOverlapPerStaff",
            "singleLocationScope"
          ]
        },
        {
          "signal": "rescheduleAppointmentUsecase",
          "title": "Reschedule appointment",
          "reason": "Updates appointment time and availability.",
          "priority": "now",
          "actor": "receptionist",
          "artifactType": "usecaseEntity",
          "references": [
            "Appointment",
            "AvailabilitySlot"
          ],
          "rulesApplied": [
            "appointmentNoOverlapPerStaff",
            "singleLocationScope"
          ]
        },
        {
          "signal": "cancelAppointmentUsecase",
          "title": "Cancel appointment",
          "reason": "Changes appointment lifecycle state and availability.",
          "priority": "now",
          "actor": "receptionist",
          "artifactType": "usecaseEntity",
          "references": [
            "Appointment"
          ],
          "rulesApplied": [
            "singleLocationScope"
          ]
        },
        {
          "signal": "checkInAppointmentUsecase",
          "title": "Check in appointment",
          "reason": "Transitions appointment to checked-in and confirms arrival.",
          "priority": "now",
          "actor": "receptionist",
          "artifactType": "usecaseEntity",
          "references": [
            "Appointment"
          ],
          "rulesApplied": [
            "appointmentMustHaveCustomerStaffService",
            "singleLocationScope"
          ]
        },
        {
          "signal": "completeAppointmentUsecase",
          "title": "Complete appointment",
          "reason": "Transitions appointment to completed and feeds sales metrics.",
          "priority": "now",
          "actor": "receptionist",
          "artifactType": "usecaseEntity",
          "references": [
            "Appointment",
            "Sale"
          ],
          "rulesApplied": [
            "singleLocationScope"
          ]
        },
        {
          "signal": "recordSaleUsecase",
          "title": "Record sale",
          "reason": "Creates sale records and triggers inventory and commission updates.",
          "priority": "now",
          "actor": "receptionist",
          "artifactType": "usecaseEntity",
          "references": [
            "Sale",
            "InventoryLedger",
            "Product",
            "CommissionRule"
          ],
          "rulesApplied": [
            "saleRequiresCompletion",
            "inventoryCannotGoNegative",
            "commissionCalculationRequired",
            "singleLocationScope"
          ]
        },
        {
          "signal": "adjustInventoryUsecase",
          "title": "Adjust inventory",
          "reason": "Updates stock levels for products.",
          "priority": "now",
          "actor": "manager",
          "artifactType": "usecaseEntity",
          "references": [
            "InventoryLedger",
            "Product"
          ],
          "rulesApplied": [
            "inventoryCannotGoNegative",
            "singleLocationScope"
          ]
        },
        {
          "signal": "calculateCommissionUsecase",
          "title": "Calculate commissions",
          "reason": "Executes commission rules for services/products.",
          "priority": "now",
          "actor": "owner",
          "artifactType": "usecaseEntity",
          "references": [
            "CommissionRule",
            "Sale",
            "StaffMember"
          ],
          "rulesApplied": [
            "commissionCalculationRequired",
            "singleLocationScope"
          ]
        },
        {
          "signal": "createCustomerUsecase",
          "title": "Create customer",
          "reason": "Creates a customer profile for bookings and sales.",
          "priority": "now",
          "actor": "receptionist",
          "artifactType": "usecaseEntity",
          "references": [
            "Customer"
          ],
          "rulesApplied": [
            "singleLocationScope"
          ]
        },
        {
          "signal": "updateCustomerUsecase",
          "title": "Update customer",
          "reason": "Updates customer profile details and preferences.",
          "priority": "now",
          "actor": "receptionist",
          "artifactType": "usecaseEntity",
          "references": [
            "Customer"
          ],
          "rulesApplied": [
            "singleLocationScope"
          ]
        },
        {
          "signal": "createStaffMemberUsecase",
          "title": "Create staff member",
          "reason": "Creates staff profile with role and commission settings.",
          "priority": "now",
          "actor": "manager",
          "artifactType": "usecaseEntity",
          "references": [
            "StaffMember",
            "CommissionRule"
          ],
          "rulesApplied": [
            "singleLocationScope"
          ]
        },
        {
          "signal": "updateStaffScheduleUsecase",
          "title": "Update staff schedule",
          "reason": "Updates availability slots for accurate booking.",
          "priority": "now",
          "actor": "manager",
          "artifactType": "usecaseEntity",
          "references": [
            "AvailabilitySlot",
            "StaffMember"
          ],
          "rulesApplied": [
            "singleLocationScope"
          ]
        },
        {
          "signal": "createServiceUsecase",
          "title": "Create service",
          "reason": "Creates a service with duration and price for bookings.",
          "priority": "now",
          "actor": "manager",
          "artifactType": "usecaseEntity",
          "references": [
            "Service"
          ],
          "rulesApplied": [
            "serviceDurationPriceRequired",
            "singleLocationScope"
          ]
        },
        {
          "signal": "updateServiceUsecase",
          "title": "Update service",
          "reason": "Updates service duration and price for bookings.",
          "priority": "now",
          "actor": "manager",
          "artifactType": "usecaseEntity",
          "references": [
            "Service"
          ],
          "rulesApplied": [
            "serviceDurationPriceRequired",
            "singleLocationScope"
          ]
        },
        {
          "signal": "requestUpsellSuggestionUsecase",
          "title": "Request upsell suggestions",
          "reason": "Generates upsell recommendations using customer history and services.",
          "priority": "soon",
          "actor": "receptionist",
          "artifactType": "usecaseEntity",
          "references": [
            "Customer",
            "Service",
            "Sale"
          ],
          "rulesApplied": [
            "singleLocationScope"
          ]
        },
        {
          "signal": "requestWalkInSlotsUsecase",
          "title": "Request walk-in time slots",
          "reason": "Generates optimal walk-in slots using availability and appointments.",
          "priority": "soon",
          "actor": "receptionist",
          "artifactType": "usecaseEntity",
          "references": [
            "AvailabilitySlot",
            "Appointment",
            "StaffMember"
          ],
          "rulesApplied": [
            "singleLocationScope"
          ]
        }
      ]
    },
    "decisions": [],
    "deferredItems": []
  }
} as const;

export default modulePlan;
