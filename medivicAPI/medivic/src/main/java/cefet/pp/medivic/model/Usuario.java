/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cefet.pp.medivic.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author dougl
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Usuario {
    protected int idUsuario;
    protected String nome;
    protected String senha;
    protected String email;
    protected String isDependente;
    
    protected List<Usuario> usuarios;
    protected List<Remedio> remedios;
}
