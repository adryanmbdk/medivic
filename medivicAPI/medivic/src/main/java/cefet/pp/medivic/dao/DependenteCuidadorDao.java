/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cefet.pp.medivic.dao;

// import cefet.pp.medivic.model.CuidadorDependente;
import cefet.pp.medivic.model.DependenteCuidador;
import cefet.pp.medivic.model.Usuario;

import java.util.List;
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

@RegisterBeanMapper(Usuario.class)
public interface DependenteCuidadorDao {
        
    @SqlUpdate("insert into usuarioAdmin (idCuidador, idDependente, tipo, administrarRemedio, cadastrarRemedio) values (:idCuidador, :idUsuario, :tipo, :administrarRemedio, :cadastrarRemedio)")
    void insert(@BindBean DependenteCuidador dependenteCuidador);
    
    
    @SqlQuery("select * " +
            " from usuario u, usuarioAdmin ua " +
            " where ua.idCuidador = a.id " +
            "   and ua.idDependente = :idDisciplina " +
            "   and ua.idCuidador = :idAluno;")
    Usuario get(@Bind("idDependente") int idDependente, @Bind("idCuidador") int idCuidador);

    @SqlQuery("select * " +
            " from usuario u, usuarioAdmin ua " +
            " where ua.idCuidador = u.idUsuario " +
            "   and ua.idDependente = :idDependente;")
    List<Usuario> getAllByDependente(@Bind("idDependente") int idDependente);
    
    @SqlUpdate("delete " +
            " from usuarioAdmin ua " +
            " where ua.idDependente = :idDependente " +
            "   and ua.idCuidador = :idCuidador;")
    int delete(@Bind("idDependente") int idDependente, @Bind("idCuidador") int idCuidador);
    
    @SqlUpdate("delete " +
            " from usuarioAdmin ua " +
            " where ua.idDependente = :idDependente;")
    int deleteAllByDependente(@Bind("idDependente") int idDependente);
}
