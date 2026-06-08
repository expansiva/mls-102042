export const productMdmModulePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "mdmDomain",
  "artifactId": "product",
  "moduleName": "product",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMDM",
    "stepId": 12,
    "planId": "plan-mdm"
  },
  "data": {
    "kind": "mdm",
    "moduleId": "product",
    "domainId": "product",
    "plannedByModule": "barbershopPro",
    "referencesExisting": false,
    "domain": {
      "domainId": "product",
      "title": "Product",
      "masterEntities": [
        "Product"
      ],
      "sourceOfTruth": "inventoryService",
      "consumers": [
        "inventoryPage",
        "salesCheckoutPage",
        "checkInCheckoutWorkflow",
        "inventoryAdjustmentWorkflow",
        "recommendationAgent",
        "recordSaleUsecase",
        "adjustInventoryUsecase"
      ],
      "governanceRules": [
        "Master product records are governed by inventoryCannotGoNegative and singleLocationScope",
        "Product catalog changes require manager approval"
      ]
    }
  }
} as const;

export default productMdmModulePlan;
