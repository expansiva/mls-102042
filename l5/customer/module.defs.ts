export const customerMdmModulePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "mdmDomain",
  "artifactId": "customer",
  "moduleName": "customer",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMDM",
    "stepId": 12,
    "planId": "plan-mdm"
  },
  "data": {
    "kind": "mdm",
    "moduleId": "customer",
    "domainId": "customer",
    "plannedByModule": "barbershopPro",
    "referencesExisting": false,
    "domain": {
      "domainId": "customer",
      "title": "Customer",
      "masterEntities": [
        "Customer"
      ],
      "sourceOfTruth": "customerService",
      "consumers": [
        "customerListPage",
        "upsellSuggestionWorkflow",
        "recommendationAgent",
        "createCustomerUsecase",
        "updateCustomerUsecase",
        "requestUpsellSuggestionUsecase"
      ],
      "governanceRules": [
        "Master customer records are governed by singleLocationScope",
        "Customer identity must be validated before profile creation"
      ]
    }
  }
} as const;

export default customerMdmModulePlan;
