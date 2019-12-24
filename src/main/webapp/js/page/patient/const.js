Alterations = {
    Deletion : -2,
    Amplification : 2
}
ONCOGENIC_CLASS_NAMES = {
    'Likely Neutral': 'neutral',
    'Unknown': 'unknown',
    'Inconclusive': 'inconclusive',
    'Predicted Oncogenic': 'oncogenic',
    'Likely Oncogenic': 'oncogenic',
    'Oncogenic': 'oncogenic'
};

LEVELS = {
    sensitivity: ['4', '3B', '3A', '2B', '2A', '1', '0'],
    resistance: ['R3', 'R2', 'R1'],
    all: ['4', 'R3', '3B', '3A', 'R2', '2B', '2A', '1', 'R1', '0']
};

LevelOfEvidence = {
    LEVEL_0 : "LEVEL_0",
    LEVEL_1 : "LEVEL_1",
    LEVEL_2A : "LEVEL_2A",
    LEVEL_2B : "LEVEL_2B",
    LEVEL_3A : "LEVEL_3A",
    LEVEL_3B : "LEVEL_3B",
    LEVEL_4 : "LEVEL_4",
    LEVEL_R1 : "LEVEL_R1",
    LEVEL_R2 : "LEVEL_R2",
    LEVEL_R3 : "LEVEL_R3",
    LEVEL_Px1 : "LEVEL_Px1",
    LEVEL_Px2 : "LEVEL_Px2",
    LEVEL_Px3 : "LEVEL_Px3",
    LEVEL_Dx1 : "LEVEL_Dx1",
    LEVEL_Dx2 : "LEVEL_Dx2",
    LEVEL_Dx3 : "LEVEL_Dx3",
}

TITLE = {
    specimen: "1",
    surgery : "2",
    biospy : "3",
    pathology: "4",
    imaging : "5"
};

// pmsportal.CC_ITEM_MGMT 에 있는 ITEM_CATE_ID 상통해야함.
subject = {
           specimen : "SPECIMEN",
           tissue: "TISSUE",
           brc : "BRC",
           pathology : "PATHOLOGY_EXAM",
           pcr : "PCR",
           ish : "ISH",
           ihc : "IHC",
           surgery : "SURGERY",
           biopsy : "BIOPSY",
           imaging : "IMAGING",
           ct : "CT",
           mri : "MRI",
           petct : "PET-CT",
           us : "UTRASONO"
};
