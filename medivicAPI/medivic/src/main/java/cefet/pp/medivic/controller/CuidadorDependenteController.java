package cefet.pp.medivic.controller;

import cefet.pp.medivic.model.Usuario;
import cefet.pp.medivic.model.CuidadorDependente;
import cefet.pp.medivic.service.CuidadorDependenteService;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/cuidador/{idCuidador}/dependente")
@CrossOrigin("*")
public class CuidadorDependenteController {
    
    private final CuidadorDependenteService cuidadorDependenteService;
    
    public CuidadorDependenteController(CuidadorDependenteService cuidadorDependenteService){
        this.cuidadorDependenteService = cuidadorDependenteService;
    }
    
    @GetMapping({"/", ""})
    public List<Usuario> getByCuidador(@PathVariable("idCuidador") int idCuidador){
        List<Usuario> usuarioList = cuidadorDependenteService.getByCuidador(idCuidador);
        return usuarioList;
    }
    
    @GetMapping("/{idDependente}")
    public Usuario consultar(
            @PathVariable("idCuidador") int idCuidador,
            @PathVariable("idDependente") int idDependente
    ){
        Usuario usuario = cuidadorDependenteService.get(idCuidador, idDependente);
        return usuario;
    }
    
    @PostMapping({"", "/"})
    public Usuario inserir(@RequestBody CuidadorDependente cuidadorDependente){
        Usuario usuario = cuidadorDependenteService.inserir(cuidadorDependente);
        return usuario;
    }
    
    @DeleteMapping({"", "/"})
    public List<Usuario> deletarByCuidador(@PathVariable("idCuidador") int idCuidador){
        List<Usuario> usuarioList = cuidadorDependenteService.getByCuidador(idCuidador);
        if (usuarioList == null || usuarioList.isEmpty()){
            throw new RuntimeException("Nao existe usuario com este idCuidador para ser excluido....");
        }
        cuidadorDependenteService.deleteAllByCuidador(idCuidador);
        return usuarioList;
    }
    
    @DeleteMapping("/{idDependente}")
    public Usuario deletar(
            @PathVariable("idCuidador") int idCuidador, 
            @PathVariable("idDependente") int idDependente
    ){
        Usuario usuario = cuidadorDependenteService.get(idCuidador, idDependente);
        if (usuario == null){
            throw new RuntimeException("Nao existe usuario com este idCuidador para ser excluido....");
        }
        cuidadorDependenteService.delete(idCuidador, idDependente);
        return usuario;
    }
}
