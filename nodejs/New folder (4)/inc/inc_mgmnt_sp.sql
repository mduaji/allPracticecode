CREATE OR REPLACE PROCEDURE inc_mgmt_sp(p_cust_id  IN NUMBER,
                                        p_mobile   IN NUMBER,
                                        p_iss_typ  IN VARCHAR2,
                                        p_iss_desc IN VARCHAR2,
                                        p_ref_id   OUT VARCHAR2,
                                        p_err_msg  OUT VARCHAR2,
                                        p_status   OUT VARCHAR2) AS

  v_cust_id         NUMBER;
  v_mobile          NUMBER;
  v_ref_id          VARCHAR2(20);
  ex_abort EXCEPTION;

BEGIN

  SELECT cust_id, mobile
    INTO v_cust_id, v_mobile
    FROM cust_tb
   WHERE cust_id = p_cust_id
      OR mobile = p_mobile;

  IF p_iss_typ IS NULL OR p_iss_desc IS NULL THEN
    RAISE ex_abort;
  END IF;

  SELECT inc_seq.NEXTVAL INTO v_ref_id FROM dual;

  p_ref_id := 'INC' || '_' || TO_CHAR(SYSDATE, 'DDMMYYYY') ||
              LPAD(v_ref_id, 5, 0);

  INSERT INTO inc_mgmt_tb
    (ref_id,
     cust_id,
     mobile,
     issue_typ,
     issue_desc,
     status,
     req_by,
     req_dttm,
     appr_by,
     appr_dttm,
     rej_by,
     rej_dttm,
     rej_desc,
     info_cng_no)
  VALUES
    (p_ref_id,
     p_cust_id,
     p_mobile,
     p_iss_typ,
     p_iss_desc,
     'PFA',
     USER,
     SYSTIMESTAMP,
     NULL,
     NULL,
     NULL,
     NULL,
     NULL,
     1);
  p_status := 'SUCCESS';
  COMMIT;
EXCEPTION
  WHEN no_data_found THEN
    p_err_msg := 'THE DATA ARE NOT MATCH';
    p_status  := 'FAILURE';
  WHEN ex_abort THEN
    p_err_msg := 'THE ISS_DESC AND ISS_TYP MUST BE NOT NULL';
    p_err_msg := 'FAILURE';
END inc_mgmt_sp;
/