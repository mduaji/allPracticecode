CREATE OR REPLACE PROCEDURE inc_mgmt_ar_sp( p_ref_id        IN    VARCHAR2
                                           ,p_ar_status     IN   VARCHAR2
										   ,p_rej_desc      IN   VARCHAR2
                                           ,p_err_msg       OUT    VARCHAR2
										   ,p_status        OUT    VARCHAR2)
AS

v_chk              NUMBER;
v_max_info_cng_no  NUMBER;
ex_abort           EXCEPTION;
v_appr_by          VARCHAR2(20);
v_appr_dttm        TIMESTAMP;
v_rej_by           VARCHAR2(20);
v_rej_dttm         TIMESTAMP;
v_rej_dec          VARCHAR2(30);
v_ar_status        VARCHAR2(30);



 BEGIN

SELECT MAX(info_cng_no)	INTO v_max_info_cng_no  
FROM inc_mgmt_tb
WHERE ref_id = p_ref_id;

SELECT 1 INTO v_chk  
FROM inc_mgmt_tb
WHERE ref_id = p_ref_id AND
status  = 'PFA' AND
info_cng_no = v_max_info_cng_no;

IF (UPPER(p_ar_status) NOT IN ('A','R') )OR
( UPPER(p_ar_status)= 'A' AND p_rej_desc IS NOT NULL) OR
(UPPER(p_ar_status) ='R' AND p_rej_desc IS NULL) THEN
RAISE ex_abort;
END IF;

IF p_ar_status='A' THEN
v_ar_status  :=p_ar_status;
v_appr_by    :=USER;
v_appr_dttm  :=SYSTIMESTAMP;
v_rej_by     :=NULL;
v_rej_dttm   :=NULL;
v_rej_dec    :=NULL;
ELSE
v_ar_status  :=p_ar_status;
v_appr_by    :=NULL;
v_appr_dttm  :=NULL;
v_rej_by     :=USER;
v_rej_dttm   :=SYSTIMESTAMP;
v_rej_dec    :=p_rej_desc;
END IF;

UPDATE inc_mgmt_tb 
SET
status        = v_ar_status, 
appr_by       = v_appr_by,
appr_dttm     = v_appr_dttm,
rej_by        = v_rej_by,
rej_dttm      = v_rej_dttm,
rej_desc      = v_rej_dttm
WHERE ref_id = p_ref_id AND
status ='PFA'AND
info_cng_no = v_max_info_cng_no;

COMMIT;
p_status:='SUCCESS';
EXCEPTION
WHEN no_data_found THEN
p_err_msg:='ref_id not found';
p_status:='FAILURE';
WHEN ex_abort THEN
p_err_msg:='p_ar_status should not A/R';
p_status:='FAILURE';
END inc_mgmt_ar_sp;
/
								   