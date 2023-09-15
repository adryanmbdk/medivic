/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cefet.pp.medivic.service;

import cefet.pp.medivic.dao.DependenteCuidadorDao;
import cefet.pp.medivic.model.Usuario;
import cefet.pp.medivic.model.DependenteCuidador;
import java.util.List;
import org.jdbi.v3.core.Jdbi;
import org.springframework.stereotype.Service;

@Service
public class DependenteCuidadorService {
    private final DependenteCuidadorDao dependenteCuidadorDao;
    
    public DependenteCuidadorService(Jdbi jdbi){
        this.dependenteCuidadorDao = jdbi.onDemand(DependenteCuidadorDao.class);
    }
    
    public DependenteCuidador inserir (DependenteCuidador dependenteCuidador){
        dependenteCuidadorDao.insert(dependenteCuidador);
        return dependenteCuidador;
    }
    
    public List<Usuario> getByDisciplina(int idDependente){
        List<Usuario> usuarioList = dependenteCuidadorDao.getAllByDependente(idDependente);
        return usuarioList;
    }
    
    public Usuario get(int idDependente, int idCuidador){
        Usuario usuario = dependenteCuidadorDao.get(idDependente, idCuidador);
        return usuario;
    }
    
    public void delete(int idDependente, int idCuidador){
        dependenteCuidadorDao.delete(idDependente, idCuidador);
    }
    
    public void deleteAllByDisciplina(int idDependente){
        dependenteCuidadorDao.deleteAllByDependente(idDependente);
    }
}
