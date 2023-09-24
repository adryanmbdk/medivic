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
import lombok.ToString;
import lombok.experimental.SuperBuilder;

/**
 *
 * @author dougl
 */
@Setter
@Getter
@ToString
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class Remedio {
    protected int idRemedio;
    protected int idUsuario;
    protected String nome;
    protected String descricao;
    protected String unidade;
    protected int quantDias;
    protected int intervalo;
    protected String dosagem;
    protected String dtInicio;
    protected String horarioNovo;
    protected String horarioInicio;
    protected String vezes;

    protected List<Horario> horarios;
}
