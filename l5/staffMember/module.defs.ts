export const staffMemberMdmModulePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "mdmDomain",
  "artifactId": "staffMember",
  "moduleName": "staffMember",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMDM",
    "stepId": 12,
    "planId": "plan-mdm"
  },
  "data": {
    "kind": "mdm",
    "moduleId": "staffMember",
    "domainId": "staffMember",
    "plannedByModule": "barbershopPro",
    "referencesExisting": false,
    "domain": {
      "domainId": "staffMember",
      "title": "Staff member",
      "masterEntities": [
        "StaffMember"
      ],
      "sourceOfTruth": "staffService",
      "consumers": [
        "appointmentBookingPage",
        "adminSettingsPage",
        "staffSchedulePage",
        "commissionCalculationWorkflow",
        "walkInSlotSuggestionWorkflow",
        "createStaffMemberUsecase",
        "updateStaffScheduleUsecase",
        "calculateCommissionUsecase",
        "metricTableOperations",
        "metricTablePerformance"
      ],
      "governanceRules": [
        "Master staff records are governed by singleLocationScope",
        "Active staff members must have a defined role to enforce RBAC"
      ]
    }
  }
} as const;

export default staffMemberMdmModulePlan;
