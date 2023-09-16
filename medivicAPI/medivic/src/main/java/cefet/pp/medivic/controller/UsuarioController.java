package cefet.pp.medivic.controller;

import cefet.pp.medivic.model.Usuario;
import cefet.pp.medivic.service.UsuarioService;

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
@RequestMapping("/api/v1/usuario")
@CrossOrigin("*")
public class UsuarioController {
    
    private final UsuarioService usuarioService;
    
    public UsuarioController(UsuarioService usuarioService){
        this.usuarioService = usuarioService;
    }
    
    @GetMapping({"/", ""})
    public List<Usuario> consultarTodos(){
        List<Usuario> usuarioList = usuarioService.consultarTodos();
        return usuarioList;
    }
    
    @GetMapping("/{idUsuario}")
    public Usuario consultarUsuario(@PathVariable("idUsuario") int idUsuario){
        Usuario ret = usuarioService.consultarPorId(idUsuario);
        return ret;
    }
    
    @PostMapping({"", "/"})
    public Usuario inserir(@RequestBody Usuario usuario){
        Usuario ret = usuarioService.inserir(usuario);
        return ret;
    }
    
    @PutMapping({"", "/"})
    public Usuario alterar(@RequestBody Usuario usuario){
        usuarioService.alterar(usuario);
        return usuario;
    }

    @GetMapping("/email/{email}/exists")
    public int emailExists(@PathVariable("email") String email) {
        Usuario usuario = usuarioService.getUserByEmail(email);

        if (usuario != null && usuario.getEmail().equals(email)) {
            return 200;
        } else
            return 404;
    }

    @GetMapping("/{email}/{senha}/authenticate")
    public int authenticate(@PathVariable("email") String email, @PathVariable("senha") String senha) {
        Usuario usuario = usuarioService.getUserByEmail(email);

        if (usuario != null && usuario.getEmail().equals(email) && usuario.getSenha().equals(senha)) {
            return 200;
        } else
            return 401;
    }
    
    @DeleteMapping("/{idUsuario}")
    public Usuario deletar(@PathVariable("idUsuario") int idUsuario){
        Usuario usuario = usuarioService.consultarPorId(idUsuario);
        if (usuario == null){
            throw new RuntimeException("Nao existe usuario com este id para ser excluido....");
        }
        usuarioService.deletar(idUsuario);
        return usuario;
    }
}
