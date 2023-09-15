package cefet.pp.medivic.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class DependenteCuidador extends Usuario{
    private int idDependente;
    private String tipo;
    private int administrarRemedio;
    private int cadastrarRemedio;
}