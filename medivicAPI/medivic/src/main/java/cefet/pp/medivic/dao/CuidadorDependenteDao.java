/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cefet.pp.medivic.dao;

import java.util.List;
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

import cefet.pp.medivic.model.CuidadorDependente;
import cefet.pp.medivic.model.Usuario;

@RegisterBeanMapper(CuidadorDependente.class)
public interface CuidadorDependenteDao {
            
    @SqlUpdate("insert into usuarioAdmin (idCuidador, idDependente, tipo, administrarRemedio, cadastrarRemedio) values (:idCuidador, :idDependente, :tipo, :administrarRemedio, :cadastrarRemedio)")
    void insert(@BindBean CuidadorDependente cuidadorDependente);
    
    
    @SqlQuery("select * " +
            " from usuario u, usuarioAdmin ua " +
            " where ua.idDependente = u.idUsuario " +
            "   and ua.idCuidador = :idCuidador " +
            "   and ua.idDependente = :idDependente;")
    Usuario get(@Bind("idCuidador") int idCuidador, @Bind("idDependente") int idDependente);

    @SqlQuery("select * " +
            " from usuario u, usuarioAdmin ua " +
            " where ua.idDependente = u.idUsuario " +
            "   and ua.idCuidador = :idCuidador;")
    List<Usuario> getAllByCuidador(@Bind("idCuidador") int idCuidador);
    
    @SqlUpdate("delete " +
            " from usuarioAdmin " +
            " where ua.idCuidador = :idCuidador " +
            "   and ua.idDependente = :idDependente;")
    int delete(@Bind("idCuidador") int idCuidador, @Bind("idDependente") int idDependente);
    
    @SqlUpdate("delete " +
            " from usuarioAdmin " +
            " where ua.idCuidador = :idCuidador;")
    int deleteAllByCuidador(@Bind("idCuidador") int idCuidador);
}
