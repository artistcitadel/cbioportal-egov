/* 
SELECT GCV.CNV_EXAM_RSLT_ID      -- ���������̰˻���ID
     , GCV.RESCH_PAT_ID          -- ����ȯ��ID
     , GCV.GENE_EXAM_SPCN_ID     -- �����ڰ˻��üID
     , GCV.EXAM_NO               -- �˻��ȣ
     , GCV.GENE_EXAM_MTH_NM      -- �����ڰ˻�����
     , GCV.CHRM_NO               -- ����ü��ȣ
     , GCV.GENE_NM               -- �����ڸ�
     , GCV.BNLG_RT               -- �����α׺���
     , GCV.CNV_PRDC_CNT          -- ���������̿����Ǽ�
     , GCV.CNV_STAT_NM           -- ���������̻��¸�
     , GCV.CHRM_SGMN_ST_LOC_VAL  -- ����ü����������ġ��
     , GCV.CHRM_SGMN_END_LOC_VAL -- ����ü����������ġ��
     , GCV.CYTB_NM               -- CYTOBAND��
     , GCV.GENE_READ_RSLT_VAL    -- �������ǵ������
     , GCV.GENE_VARI_RPRS_VAL    -- �����ں���ǥ����
  FROM PMGERCVEM GCV
;
*/



/* Copy Number Alterations */
SELECT GCV.CNV_EXAM_RSLT_ID           -- ���������̰˻���ID (ȭ��ǥ��X)
     , GCV.GENE_NM                    -- Gene (Annotation OncoKB ���)
     , GCV.GENE_EXAM_MTH_NM           -- Methods
     , UPPER(GCV.CNV_STAT_NM) AS CNA  -- CNA (Annotation OncoKB ���)
     , GCV.CYTB_NM                    -- Cytoband
     , ROUND((SELECT COUNT(*) FROM pmsdev.PMGERCVEM WHERE GENE_NM = GCV.GENE_NM) / PAT.PAT_CNT * 100, 1) AS COHORT_1   -- Cohort (������)
     , ROUND((SELECT COUNT(*) FROM pmsdev.PMGERCVEM WHERE GENE_NM = GCV.GENE_NM AND CNV_STAT_NM = GCV.CNV_STAT_NM) / PAT.PAT_CNT * 100, 1) AS COHORT_2   -- Cohort (���ѻ�)
     , NULL                           -- ���� (Annotation OncoKB ���)
  FROM pmsdev.PMGERCVEM GCV
     , ( SELECT COUNT(*) AS PAT_CNT   -- ��üȯ�ڼ�
           FROM ( SELECT RESCH_PAT_ID FROM pmsdev.PMGERMUEM
                   UNION
                  SELECT RESCH_PAT_ID FROM pmsdev.PMGERCVEM
                   UNION
                  SELECT RESCH_PAT_ID FROM pmsdev.PMGERSVEM
                   UNION
                  SELECT RESCH_PAT_ID FROM pmsdev.PMGERGNEX ) PAT_ALL
       ) PAT
 WHERE GCV.RESCH_PAT_ID = '10510117'  -- ����ȯ��ID (��ȸ����)
;
