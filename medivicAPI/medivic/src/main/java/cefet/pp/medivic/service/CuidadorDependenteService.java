/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cefet.pp.medivic.service;

import cefet.pp.medivic.dao.CuidadorDependenteDao;
import cefet.pp.medivic.model.CuidadorDependente;
import cefet.pp.medivic.model.Usuario;

import java.util.List;
import org.jdbi.v3.core.Jdbi;
import org.springframework.stereotype.Service;

@Service
public class CuidadorDependenteService {
    private final CuidadorDependenteDao cuidadorDependenteDao;
    
    public CuidadorDependenteService(Jdbi jdbi){
        this.cuidadorDependenteDao = jdbi.onDemand(CuidadorDependenteDao.class);
    }
    
    public CuidadorDependente inserir (CuidadorDependente cuidadorDependente){
        cuidadorDependenteDao.insert(cuidadorDependente);
        return cuidadorDependente;
    }
    
    public List<Usuario> getByCuidador(int idCuidador){
        List<Usuario> usuarioList = cuidadorDependenteDao.getAllByCuidador(idCuidador);
        return usuarioList;
    }
    
    public Usuario get(int idCuidador, int idDependente){
        Usuario usuario = cuidadorDependenteDao.get(idCuidador, idDependente);
        return usuario;
    }
    
    public void delete(int idCuidador, int idDependente){
        cuidadorDependenteDao.delete(idCuidador, idDependente);
    }
    
    public void deleteAllByCuidador(int idCuidador){
        cuidadorDependenteDao.deleteAllByCuidador(idCuidador);
    }
}
