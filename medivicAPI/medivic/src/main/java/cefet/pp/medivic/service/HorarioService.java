/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cefet.pp.medivic.service;

import cefet.pp.medivic.dao.HorarioDao;
import cefet.pp.medivic.model.Horario;

import java.util.List;
import org.jdbi.v3.core.Jdbi;
import org.springframework.stereotype.Service;

/**
 *
 * @author dougl
 */
@Service
public class HorarioService {
    
    private final HorarioDao horarioDao;
    
    public HorarioService(Jdbi jdbi){
        this.horarioDao = jdbi.onDemand(HorarioDao.class);
    }
    
    public Horario inserir (Horario horario){
        int idHorario = horarioDao.insert(horario);
        horario.setIdHorario(idHorario);
        return horario;
    }
    
    public List<Horario> consultarTodos(){
        List<Horario> horarioList = horarioDao.getAll();
        return horarioList;
    }
    
    public Horario consultarPorId(int id){
        Horario remedio = horarioDao.get(id);
        return remedio;
    }
    
    public void alterar(Horario horario){
        horarioDao.update(horario);
    }
    
    public void excluir(int id){
        horarioDao.delete(id);
    }
    
}
