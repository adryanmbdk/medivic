/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cefet.pp.medivic.dao;

import cefet.pp.medivic.model.Usuario;
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
@RegisterBeanMapper(Usuario.class)
public interface UsuarioDao {

        @GetGeneratedKeys
        @SqlUpdate("insert into usuario (nome, senha, email, isCuidador) values (:nome, :senha, :email, :isCuidador)")
        int insert(@BindBean Usuario usuario);

        @SqlQuery("select * " +
                        " from usuario " +
                        " where idUsuario = :idUsuario;")
        Usuario get(@Bind("idUsuario") int idUsuario);

        @SqlQuery("select * " +
                        " from usuario " +
                        " order by nome;")
        List<Usuario> getAll();

        @SqlQuery("select * " +
                        " from usuario " +
                        " where nome like :nome " +
                        " order by nome;")
        List<Usuario> getAllByName(@Bind("nome") String nome);

        @SqlQuery("select * " +
                        " from usuario " +
                        " where email like :email;")
        Usuario getUserByEmail(@Bind("email") String email);

        @SqlUpdate("update usuario " +
                        " set nome = :nome, " +
                        "     senha = :senha, " +
                        "     email = :email " +
                        "     isCuidador = :isCuidador" +
                        " where idUsuario = :idUsuario;")
        int update(@BindBean Usuario usuario);

        @SqlUpdate("delete " +
                        " from usuario " +
                        " where idUsuario = :idUsuario;")
        int delete(@Bind("idUsuario") int idUsuario);

}
