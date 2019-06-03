PROMPT<****************** src_cls_tb Table creation Starts********>

CREATE TABLE src_cl_tb
(stk_id     NUMBER,
stk_name    VARCHAR2(20),
stk_qnty    NUMBER,
src_loc     VARCHAR2(30),
tgt_loc     VARCHAR2(30));

PROMPT<****************** src_cls_tb Table creation Ends*************>


PROMPT<****************** src_cls_trg_tb Table creation Starts********>
DROP TABLE src_cls_trg_tb;
CREATE TABLE src_cls_trg_tb
(stk_id     NUMBER,
stk_name    VARCHAR2(20),
stk_qnty    NUMBER,
src_loc     VARCHAR2(30),
tgt_loc     VARCHAR2(30),
status      VARCHAR2(5),
upt_by      VARCHAR2(5),
dttm        TIMESTAMP);

PROMPT<****************** src_cls_trg_tb Table creation Ends***********>

PROMPT<****************** src_cls_hist_tb Table creation Starts********>
DROP TABLE src_cls_hist_tb;
CREATE TABLE src_cls_hist_tb
(stk_id     NUMBER,
stk_name    VARCHAR2(20),
stk_qnty    NUMBER,
src_loc     VARCHAR2(30),
tgt_loc     VARCHAR2(30),
upt_by      VARCHAR2(5),
dttm        TIMESTAMP);

PROMPT<****************** src_cls_hist_tb Table creation Ends********>


 grant select,update,delete on src_cls_tb to hr;

Grant succeeded.

INSERT INTO src_cl_tb (stk_id,stk_name,stk_qnty,src_loc,tgt_loc) 
       values   (100,'xx1',1,'yy','zz');
INSERT INTO src_cl_tb (stk_id,stk_name,stk_qnty,src_loc,tgt_loc) 
       values   (101,'xx2',2,'yy2','zz2');
INSERT INTO src_cl_tb (stk_id,stk_name,stk_qnty,src_loc,tgt_loc) 
       values   (102,'xx3',3,'yy3','zz3');




