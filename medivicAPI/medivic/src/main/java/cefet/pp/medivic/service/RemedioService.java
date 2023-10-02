/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cefet.pp.medivic.service;

import cefet.pp.medivic.dao.HorarioDao;
import cefet.pp.medivic.dao.RemedioDao;
import cefet.pp.medivic.model.Horario;
import cefet.pp.medivic.model.Remedio;

import java.util.List;
import org.jdbi.v3.core.Jdbi;
import org.springframework.stereotype.Service;

/**
 *
 * @author dougl
 */
@Service
public class RemedioService {

    private final RemedioDao remedioDao;
    private final HorarioDao horarioDao;

    public RemedioService(Jdbi jdbi) {
        this.remedioDao = jdbi.onDemand(RemedioDao.class);
        this.horarioDao = jdbi.onDemand(HorarioDao.class);
    }

    public Remedio inserir(Remedio remedio) {
        int idRemedio = remedioDao.insert(remedio);
        remedio.setIdRemedio(idRemedio);
        return remedio;
    }

    public List<Remedio> consultarTodos() {
        List<Remedio> remedioList = remedioDao.getAll();

        for (Remedio remedio : remedioList) {
            List<Horario> horarioList = horarioDao.getAllByRemedio(remedio.getIdRemedio());
            remedio.setHorarios(horarioList);
        }

        return remedioList;
    }

    public Remedio consultarPorId(int idRemedio) {
        Remedio remedio = remedioDao.get(idRemedio);
        if (remedio != null) {
            List<Horario> horarioList = horarioDao.getAllByRemedio(remedio.getIdRemedio());
            remedio.setHorarios(horarioList);
        }
        return remedio;
    }

    public List<Remedio> consultarPorUsuario(int idUsuario) {
        List<Remedio> remedioList = remedioDao.getAllByUsuario(idUsuario);
        for (Remedio remedio : remedioList) {
            List<Horario> horarioList = horarioDao.getAllByRemedio(remedio.getIdRemedio());
            remedio.setHorarios(horarioList);
        }
        return remedioList;
    }

    public List<Remedio> consultarRemediosEmUso(int idUsuario) {
        List<Remedio> remedioList = remedioDao.getEmUsoByUsuario(idUsuario);
        for (Remedio remedio : remedioList) {
            List<Horario> horarioList = horarioDao.getAllByRemedio(remedio.getIdRemedio());
            remedio.setHorarios(horarioList);
        }
        return remedioList;
    }

    public List<Remedio> consultarRemediosFinalizados(int idUsuario) {
        List<Remedio> remedioList = remedioDao.getFinalizadosByUsuario(idUsuario);
        for (Remedio remedio : remedioList) {
            List<Horario> horarioList = horarioDao.getAllByRemedio(remedio.getIdRemedio());
            remedio.setHorarios(horarioList);
        }
        return remedioList;
    }

    public void alterar(Remedio remedio) {
        remedioDao.update(remedio);
    }

    public void excluir(int idRemedio) {
        remedioDao.delete(idRemedio);
    }

}
