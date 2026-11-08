CREATE TABLE ESPECIALIDADE (
    cd_especialidade CHAR(3) NOT NULL,
    nm_especialidade VARCHAR2(30),
    CONSTRAINT ESPECIALIDADE_PK PRIMARY KEY (cd_especialidade)
);

CREATE TABLE MEDICO (
    cd_CRM CHAR(12) NOT NULL,
    nm_medico VARCHAR2(80),
    ds_endereco_medico VARCHAR2(100),
    nr_telefone_medico NUMBER(11),
    vl_salario NUMBER(10,2),
    ds_email CHAR(80),
    cd_especialidade CHAR(3) NOT NULL,
    CONSTRAINT MEDICO_PK PRIMARY KEY (cd_CRM),
    CONSTRAINT MEDICO_ESPEC_FK FOREIGN KEY (cd_especialidade) REFERENCES ESPECIALIDADE(cd_especialidade)
);

CREATE TABLE CLINICA (
    id_clinica NUMBER(8) NOT NULL,
    nm_clinica VARCHAR2(80),
    ds_endereco VARCHAR2(100),
    vl_latitude FLOAT,
    vl_longitude FLOAT,
    CONSTRAINT CLINICA_PK PRIMARY KEY (id_clinica)
);

CREATE TABLE PACIENTE (
    id_paciente NUMBER(6) NOT NULL,
    nm_paciente VARCHAR2(60),
    dt_nasc_paciente DATE,
    ds_endereco_paciente VARCHAR2(100),
    nr_tel_paciente NUMBER(11),
    nr_carteira_convenio NUMBER(18),
    nr_cpf_paciente NUMBER(11),
    id_care_point NUMBER(6),
    CONSTRAINT PACIENTE_PK PRIMARY KEY (id_paciente)
);

CREATE TABLE MEDSYNC (
    id_care_point NUMBER(6) NOT NULL,
    fl_checkin_realizado CHAR(1),
    nivel_paciente CHAR(10),
    qtde_pontos NUMBER(10),
    id_paciente NUMBER(6) NOT NULL,
    CONSTRAINT MEDSYNC_PK PRIMARY KEY (id_care_point),
    CONSTRAINT MEDSYNC_PACIENTE_FK FOREIGN KEY (id_paciente) REFERENCES PACIENTE(id_paciente)
);

CREATE TABLE CONSULTA (
    id_consulta NUMBER(10) NOT NULL,
    dt_hr_consulta DATE,
    vl_consulta NUMBER(10,2),
    status_consulta CHAR(15),
    cd_CRM CHAR(12) NOT NULL,
    id_clinica NUMBER(8) NOT NULL,
    id_paciente NUMBER(6) NOT NULL,
    CONSTRAINT CONSULTA_PK PRIMARY KEY (id_consulta),
    CONSTRAINT CONS_MEDICO_FK FOREIGN KEY (cd_CRM) REFERENCES MEDICO(cd_CRM),
    CONSTRAINT CONS_CLINICA_FK FOREIGN KEY (id_clinica) REFERENCES CLINICA(id_clinica),
    CONSTRAINT CONS_PACIENTE_FK FOREIGN KEY (id_paciente) REFERENCES PACIENTE(id_paciente)
);

CREATE TABLE RECOMPENSA (
    id_recompensa NUMBER(6) NOT NULL,
    nm_recompensa VARCHAR2(80),
    ds_recompensa VARCHAR2(255),
    vl_pontos_necessarios NUMBER(5),
    CONSTRAINT RECOMPENSA_PK PRIMARY KEY (id_recompensa)
);

CREATE TABLE RESGATE_RECOMPENSA (
    id_resgate NUMBER(10) NOT NULL,
    dt_hr_resgate DATE,
    id_paciente NUMBER(6) NOT NULL,
    id_recompensa NUMBER(6) NOT NULL,
    CONSTRAINT RESGATE_PK PRIMARY KEY (id_resgate),
    CONSTRAINT RESG_PACIENTE_FK FOREIGN KEY (id_paciente) REFERENCES PACIENTE(id_paciente),
    CONSTRAINT RESG_RECOMPENSA_FK FOREIGN KEY (id_recompensa) REFERENCES RECOMPENSA(id_recompensa)
);

ALTER TABLE PACIENTE ADD CONSTRAINT PACIENTE_MEDSYNC_FK FOREIGN KEY (id_care_point) REFERENCES MEDSYNC(id_care_point);
