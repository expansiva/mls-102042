export const rulesPlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "rules",
  "artifactId": "barbershopProRules",
  "moduleName": "barbershopPro",
  "status": "draft",
  "source": {
    "agentName": "agentFinalizeSolutionPlan",
    "stepId": 11,
    "planId": "plan-finalize-solution-plan"
  },
  "data": {
    "moduleName": "barbershopPro",
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
    ]
  }
} as const;

export default rulesPlan;
