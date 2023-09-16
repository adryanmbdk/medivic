package cefet.pp.medivic.controller;

import cefet.pp.medivic.model.Remedio;
import cefet.pp.medivic.service.RemedioService;

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
@RequestMapping("/api/v1/remedio")
@CrossOrigin("*")
public class RemedioController {

    private final RemedioService remedioService;

    public RemedioController(RemedioService remedioService) {
        this.remedioService = remedioService;
    }

    @GetMapping({ "/", "" })
    public List<Remedio> consultarTodos() {
        List<Remedio> remedioList = remedioService.consultarTodos();
        return remedioList;
    }

    @GetMapping("/{idRemedio}")
    public Remedio consultarRemedio(@PathVariable("idRemedio") int idRemedio) {
        Remedio ret = remedioService.consultarPorId(idRemedio);
        return ret;
    }

    @GetMapping("usuario/{idUsuario}")
    public List<Remedio> consultarRemedioUsuario(@PathVariable("idUsuario") int idUsuario) {
        List<Remedio> ret = remedioService.consultarPorUsuario(idUsuario);
        return ret;
    }

    @PostMapping({ "", "/" })
    public Remedio inserir(@RequestBody Remedio remedio) {
        Remedio ret = remedioService.inserir(remedio);
        return ret;
    }

    @PutMapping({ "", "/" })
    public Remedio alterar(@RequestBody Remedio remedio) {
        remedioService.alterar(remedio);
        return remedio;
    }

    @DeleteMapping("/{idRemedio}")
    public Remedio deletar(@PathVariable("idRemedio") int idRemedio) {
        Remedio remedio = remedioService.consultarPorId(idRemedio);
        if (remedio == null) {
            throw new RuntimeException("Nao existe remedio com este id para ser excluido....");
        }
        remedioService.excluir(idRemedio);
        return remedio;
    }
}
