export const commissionRuleMdmModulePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "mdmDomain",
  "artifactId": "commissionRule",
  "moduleName": "commissionRule",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMDM",
    "stepId": 12,
    "planId": "plan-mdm"
  },
  "data": {
    "kind": "mdm",
    "moduleId": "commissionRule",
    "domainId": "commissionRule",
    "plannedByModule": "barbershopPro",
    "referencesExisting": false,
    "domain": {
      "domainId": "commissionRule",
      "title": "Commission rule",
      "masterEntities": [
        "CommissionRule"
      ],
      "sourceOfTruth": "commissionService",
      "consumers": [
        "staffPerformancePage",
        "adminSettingsPage",
        "commissionCalculationWorkflow",
        "createStaffMemberUsecase",
        "calculateCommissionUsecase",
        "recordSaleUsecase",
        "metricTablePerformance"
      ],
      "governanceRules": [
        "Master commission rules are governed by commissionCalculationRequired and singleLocationScope",
        "Commission rule changes require owner approval"
      ]
    }
  }
} as const;

export default commissionRuleMdmModulePlan;
