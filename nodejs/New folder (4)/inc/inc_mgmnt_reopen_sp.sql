	CREATE OR REPLACE PROCEDURE inc_mgmt_reopen_sp(p_ref_id    IN VARCHAR2
												   ,p_status   OUT VARCHAR2
												   ,p_err_msg  OUT VARCHAR2)
	AS
	v_max_info_cng_no   NUMBER;
	v_ref_id            VARCHAR2(30);

	BEGIN

	SELECT MAX(info_cng_no)	INTO v_max_info_cng_no  
	FROM inc_mgmt_tb
	WHERE ref_id = p_ref_id
	  AND status = 'R';

	--SELECT ref_id INTO  v_ref_id  
	--FROM inc_mgmt_tb
	--WHERE ref_id = p_ref_id AND
	--      status <>  'PFA' AND
	--info_cng_no = v_max_info_cng;

	INSERT INTO inc_mgmt_tb ( ref_id
							 ,cust_id    
							 ,mobile   
							 ,issue_typ  
							 ,issue_desc 
							 ,status
							 ,req_by     
							 ,req_dttm  
							 ,appr_by  
							 ,appr_dttm  
							 ,rej_by
							 ,rej_dttm   
							 ,rej_desc   
							 ,info_cng_no)
							 (SELECT
							  p_ref_id
							 ,cust_id
							 ,mobile
							 ,issue_typ
							 ,issue_desc
							 ,'PFA'
							 ,USER
							 ,SYSTIMESTAMP
							 ,NULL
							 ,NULL
							 ,NULL
							 ,NULL
							 ,NULL
							 ,info_cng_no + 1
							 FROM inc_mgmt_tb
							 WHERE info_cng_no = v_max_info_cng_no);

	COMMIT;
	p_status:='SUCCESS';
	EXCEPTION
	WHEN no_data_found THEN
	p_err_msg:='ref_id not valid';
	p_status:='FAILURE';
	END inc_mgmt_reopen_sp;
	/