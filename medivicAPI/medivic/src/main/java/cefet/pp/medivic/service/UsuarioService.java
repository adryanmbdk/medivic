/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cefet.pp.medivic.service;

import cefet.pp.medivic.dao.RemedioDao;
import cefet.pp.medivic.dao.UsuarioDao;
import cefet.pp.medivic.model.Remedio;
import cefet.pp.medivic.model.Usuario;
import java.util.List;
import org.jdbi.v3.core.Jdbi;
import org.springframework.stereotype.Service;

/**
 *
 * @author dougl
 */
@Service
public class UsuarioService {
    
    private final UsuarioDao usuarioDao;
    private final RemedioDao remedioDao; 
    
    public UsuarioService(Jdbi jdbi){
        this.usuarioDao = jdbi.onDemand(UsuarioDao.class);
        this.remedioDao = jdbi.onDemand(RemedioDao.class);
    }
    
    public Usuario inserir (Usuario usuario){
        int idUsuario = usuarioDao.insert(usuario);
        usuario.setIdUsuario(idUsuario);
        return usuario;
    }
    
    public List<Usuario> consultarTodos(){
        List<Usuario> usuarioList = usuarioDao.getAll();
        
        for (Usuario usuario : usuarioList) {
            List<Remedio> remedioList = remedioDao.getAllByUsuario(usuario.getIdUsuario());
            usuario.setRemedios(remedioList);
        }
        
        return usuarioList;
    }
    
    public Usuario consultarPorId(int id){
        Usuario usuario = usuarioDao.get(id);
        if (usuario != null){
            List<Remedio> remedioList = remedioDao.getAllByUsuario(usuario.getIdUsuario());
            usuario.setRemedios(remedioList);
        }
        return usuario;
    }
    
    public void alterar(Usuario usuario){
        usuarioDao.update(usuario);
    }
    
    public void excluir(int id){
        usuarioDao.delete(id);
    }
    
}
