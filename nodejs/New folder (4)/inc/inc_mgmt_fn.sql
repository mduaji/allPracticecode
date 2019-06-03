CREATE OR REPLACE FUNCTION inc_mgmt_fn ( p_ref_id          VARCHAR2
                                        ,p_status   OUT    VARCHAR2)
RETURN VARCHAR2
AS
v_max_info_cng_no       NUMBER;
v_status                NUMBER;

BEGIN

SELECT max(info_cng_no)  INTO v_max_info_cng_no   
FROM inc_mgmt_tb
WHERE ref_id = p_ref_id;


SELECT status INTO v_status 
FROM inc_mgmt_tb
WHERE ref_id   = p_ref_id AND
info_cng_no  = v_max_info_cng_no;
RETURN v_status;

COMMIT;
END inc_mgmt_fn;
/