/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cefet.pp.medivic.dao;

import cefet.pp.medivic.model.Horario;

import java.util.List;
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

/**
 *
 * @author dougl
 */
@RegisterBeanMapper(Horario.class)
public interface HorarioDao {
    
    @GetGeneratedKeys
    @SqlUpdate("insert into horario (idRemedio, data, hora) values (:idRemedio, :data, :hora)")
    int insert(@BindBean Horario horario);
    
    
    @SqlQuery("select * " +
            " from horario " +
            " where idHorario = :idHorario;")
    Horario get(@Bind("idHorario") int idHorario);

    
    @SqlQuery("select * " +
            " from horario " +
            " order by data;")
    List<Horario> getAll();

    
    @SqlQuery("select * " +
            " from horario " +
            " where data like :data " +
            " order by data;")
    List<Horario> getAllByData(@Bind("data") String data);

        @SqlQuery("select * " +
            " from horario " +
            " where idRemedio = :idRemedio;")
    List<Horario> getAllByRemedio(@Bind("idRemedio") int idRemedio);


    @SqlUpdate("update horario " +
            " set idRemedio = :idRemedio, " +
            "     data = :data, " +
            "     hora = :hora " +
            " where idHorario = :idHorario;")
    int update(@BindBean Horario horario);

    
    @SqlUpdate("delete " +
            " from horario " +
            " where idHorario = :idHorario;")
    int delete(@Bind("idHorario") int idHorario);

}
