CREATE OR REPLACE PROCEDURE dt_mrsg_sp
AS
BEGIN
INSERT INTO src_cls_hist_tb(
                          stk_id,
                          stk_name,
                          stk_qnty,
                          src_loc,
                          tgt_loc,
                          upt_by,
                          dttm)
						  (SELECT 
						  stk_id,
                          stk_name,
	                      stk_qnty,
                          src_loc,
                          tgt_loc,
                          USER,
                          SYSTIMESTAMP 
						  FROM src_cls_trg_tb
						  WHERE status='H');

DELETE FROM src_cls_trg_tb WHERE status='H';
dbms_output.put_line(5);

UPDATE src_cls_trg_tb
SET status='H'
WHERE status='I';
dbms_output.put_line(2);

UPDATE src_cls_trg_tb
SET status='I'
WHERE status='A';
dbms_output.put_line(1);


INSERT INTO src_cls_trg_tb(
                          stk_id,
                          stk_name,
                          stk_qnty,
                          src_loc,
                          tgt_loc,
                          status,
                          upt_by,
                          dttm)
						  (SELECT 
						  stk_id,
                          stk_name,
	                      stk_qnty,
                          src_loc,
                          tgt_loc,
                          'A',
                          USER,
                          SYSTIMESTAMP 
						  FROM system.src_cl_tb);
dbms_output.put_line(3);
dbms_output.put_line(4);
COMMIT;
END dt_mrsg_sp;
/