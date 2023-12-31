/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cefet.pp.medivic.dao;

import cefet.pp.medivic.model.Remedio;
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
@RegisterBeanMapper(Remedio.class)
public interface RemedioDao {
    
    @GetGeneratedKeys
    @SqlUpdate("insert into remedio (idUsuario, nome, descricao, unidade, quantDias, intervalo, dosagem, dtInicio, dtNovo, horarioNovo, horarioInicio, vezes)" + 
    "values (:idUsuario, :nome, :descricao, :unidade, :quantDias, :intervalo, :dosagem, :dtInicio, :dtNovo, :horarioNovo, :horarioInicio, :vezes)")
    int insert(@BindBean Remedio remedio);
    
    @SqlQuery("select * " +
            " from remedio " +
            " where idRemedio = :idRemedio;")
    Remedio get(@Bind("idRemedio") int idRemedio);

    
    @SqlQuery("select * " +
            " from remedio " +
            " order by nome;")
    List<Remedio> getAll();

    
    @SqlQuery("select * " +
            " from remedio " +
            " where nome like :nome " +
            " order by nome;")
    List<Remedio> getAllByName(@Bind("nome") String nome);

    @SqlQuery("select * " +
            " from remedio " +
            " where idUsuario = :idUsuario;")
    List<Remedio> getAllByUsuario(@Bind("idUsuario") int idUsuario);

    @SqlQuery("select * " +
            " from remedio " +
            " where vezes <> 0 and idUsuario = :idUsuario;")
    List<Remedio> getEmUsoByUsuario(@Bind("idUsuario") int idUsuario);

    @SqlQuery("select * " +
            " from remedio " +
            " where vezes = 0 and idUsuario = :idUsuario;")
    List<Remedio> getFinalizadosByUsuario(@Bind("idUsuario") int idUsuario);

    @SqlUpdate("update remedio " +
            " set idUsuario = :idUsuario, " +
            "     nome = :nome, " +
            "     descricao = :descricao, " +
            "     unidade = :unidade, " +
            "     quantDias = :quantDias, " +
            "     intervalo = :intervalo, " +
            "     dosagem = :dosagem, " +
            "     dtInicio = :dtInicio, " +
            "     dtNovo = :dtNovo, " +
            "     horarioNovo = :horarioNovo, " +
            "     horarioInicio = :horarioInicio, " +
            "     vezes = :vezes " +

            " where idRemedio = :idRemedio;")
    int update(@BindBean Remedio remedio);

    
    
    @SqlUpdate("delete " +
            " from remedio " +
            " where idRemedio = :idRemedio;")
    int delete(@Bind("idRemedio") int idRemedio);

}
