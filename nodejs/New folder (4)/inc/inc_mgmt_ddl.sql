
PROMPT<**************** cust_tb TABLE CREATION STARTS ********************>

DROP TABLE cust_tb;

CREATE TABLE cust_tb
                    (  cust_id      VARCHAR2(30)
					  ,name         VARCHAR2(20)
					  ,mobile       NUMBER
					  ,address      VARCHAR2(30)
					 );
					  
PROMPT<**************** cust_tb TABLE CREATION ENDS ***********************>

PROMPT<**************** inc_mgmt_tb TABLE CREATION STARTS ******************>

DROP TABLE inc_mgmt_tb;

CREATE TABLE inc_mgmt_tb(  ref_id            VARCHAR2(30)
                          ,cust_id           NUMBER
						  ,mobile            NUMBER
						  ,issue_typ         VARCHAR2(30)
						  ,issue_desc        VARCHAR2(30)
						  ,status            VARCHAR2(30)
						  ,req_by            VARCHAR2(30)
						  ,req_dttm          TIMESTAMP
						  ,appr_by           VARCHAR2(30)
						  ,appr_dttm         TIMESTAMP
						  ,rej_by            VARCHAR2(30)
						  ,rej_dttm          TIMESTAMP
						  ,rej_desc          VARCHAR2(30)
						  ,info_cng_no       NUMBER);
						  
PROMPT<**************** inc_mgmt_tb TABLE CREATION ENDS ******************>

PROMPT<**************** inc_seq  CREATION STARTS ******************>

DROP SEQUENCE inc_seq;
					  
CREATE SEQUENCE inc_seq
MINVALUE 100
MAXVALUE 1000
START WITH 100
INCREMENT BY 1;

PROMPT<**************** inc_seq  CREATION ENDS ******************>


						  
BEGIN
INSERT INTO cust_tb
( cust_id,name,mobile,address) VALUES (100,'aji',9944572713,'chennai');
INSERT INTO cust_tb
( cust_id,name,mobile,address) VALUES (101,'arun',9944572714,'madurai');
INSERT INTO cust_tb
( cust_id,name,mobile,address) VALUES (102,'aji',9944572715,'guindy');
END;
/

					  
					  