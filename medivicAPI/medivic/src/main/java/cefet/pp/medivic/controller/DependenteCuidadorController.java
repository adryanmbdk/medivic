/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cefet.pp.medivic.controller;

import cefet.pp.medivic.model.Usuario;
import cefet.pp.medivic.model.DependenteCuidador;
import cefet.pp.medivic.service.DependenteCuidadorService;
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
@RequestMapping("/api/v1/dependente/{idDependente}/cuidador")
@CrossOrigin("*")
public class DependenteCuidadorController {
    
    private final DependenteCuidadorService dependenteCuidadorService;
    
    public DependenteCuidadorController(DependenteCuidadorService dependenteCuidadorService){
        this.dependenteCuidadorService = dependenteCuidadorService;
    }
    
    @GetMapping({"/", ""})
    public List<Usuario> consultarTodos(@PathVariable("idDependente") int idDependente){
        List<Usuario> usuarioList = dependenteCuidadorService.getByDisciplina(idDependente);
        return usuarioList;
    }
    
    @GetMapping("/{idCuidador}")
    public Usuario consultarCuidador(@PathVariable("idDependente") int idDependente, @PathVariable("idCuidador") int idCuidador){
        Usuario usuario = dependenteCuidadorService.get(idDependente, idCuidador);
        return usuario;
    }
    
    @PostMapping({"", "/"})
    public Usuario inserir(@RequestBody DependenteCuidador dependenteCuidador){
        Usuario usuario = dependenteCuidadorService.inserir(dependenteCuidador);
        return usuario;
    }
    
    @DeleteMapping({"", "/"})
    public List<Usuario> deletar(@PathVariable("idDependente") int idDependente){
        List<Usuario> usuarioList = dependenteCuidadorService.getByDisciplina(idDependente);
        if (usuarioList == null || usuarioList.isEmpty()){
            throw new RuntimeException("Nao existem alunos com este idDependente para ser excluido....");
        }
        dependenteCuidadorService.deleteAllByDisciplina(idDependente);
        return usuarioList;
    }
    
    @DeleteMapping("/{idCuidador}")
    public Usuario deletar(
            @PathVariable("idDependente") int idDependente, 
            @PathVariable("idCuidador") int idCuidador
    ){
        Usuario usuario = dependenteCuidadorService.get(idDependente, idCuidador);
        if (usuario == null){
            throw new RuntimeException("Nao existe usuario com este id para ser excluido....");
        }
        dependenteCuidadorService.delete(idDependente, idCuidador);
        return usuario;
    }
    
}
