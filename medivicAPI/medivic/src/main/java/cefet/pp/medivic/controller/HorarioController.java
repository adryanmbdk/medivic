package cefet.pp.medivic.controller;

import cefet.pp.medivic.model.Horario;
import cefet.pp.medivic.service.HorarioService;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/horario")
@CrossOrigin("*")
public class HorarioController {
    
    private final HorarioService horarioService;
    
    public HorarioController(HorarioService horarioService){
        this.horarioService = horarioService;
    }
    
    @GetMapping({"/", ""})
    public List<Horario> consultarTodos(){
        List<Horario> horarioList = horarioService.consultarTodos();
        return horarioList;
    }
    
    @GetMapping("/{idHorario}")
    public Horario consultarHorario(@PathVariable("idHorario") int idHorario){
        Horario ret = horarioService.consultarPorId(idHorario);
        return ret;
    }
    
    @PostMapping({"", "/"})
    public Horario inserir(@RequestBody Horario horario){
        Horario ret = horarioService.inserir(horario);
        return ret;
    }
    
    @PutMapping({"", "/"})
    public Horario alterar(@RequestBody Horario horario){
        horarioService.alterar(horario);
        return horario;
    }
    
    @DeleteMapping("/{idHorario}")
    public Horario deletar(@PathVariable("idHorario") int idHorario){
        Horario horario = horarioService.consultarPorId(idHorario);
        if (horario == null){
            throw new RuntimeException("Nao existe horario com este id para ser excluido....");
        }
        horarioService.excluir(idHorario);
        return horario;
    }
}
