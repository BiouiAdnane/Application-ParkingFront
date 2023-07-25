import {Component, OnInit} from '@angular/core';
import {Conducteur} from "../../EnititeComponent/Models/Conducteur";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ConducteurService} from "../../Services/conducteur.service";

@Component({
  selector: 'app-update-conducteur',
  templateUrl: './update-conducteur.component.html',
  styleUrls: ['./update-conducteur.component.css']
})
export class UpdateConducteurComponent  implements OnInit{

  cin!:string;
  conducteur!:Conducteur;
  updateConducteurFormGroup!: FormGroup;
  form: FormGroup = this.fb.group({})

  constructor(private route:ActivatedRoute,private router:Router, public conducteurService : ConducteurService
              , private fb : FormBuilder) {
    this.conducteur=this.router.getCurrentNavigation()?.extras.state as Conducteur;
    this.updateConducteurFormGroup=new FormGroup({
      cin:new FormControl(),
      matricule:new FormControl(),
      nom:new FormControl(),
      prenom:new FormControl(),
      adresse:new FormControl(),
      date_Naissance:new FormControl(),
      numTel:new FormControl(),
    })

  }

  ngOnInit(): void {
    this.cin=this.route.snapshot.params['cin'];
    this.conducteurService.getConducteur(this.cin).subscribe({
      next:(conducteur)=>{
        this.conducteur=conducteur;
        this.updateConducteurFormGroup=this.fb.group({
          cin:this.fb.control(this.conducteur.cin),
          matricule:this.fb.control(this.conducteur.matricule),
          nom:this.fb.control(this.conducteur.nom),
          prenom:this.fb.control(this.conducteur.prenom),
          adresse:this.fb.control(this.conducteur.adresse),
          date_Naissance: this.fb.control(this.conducteur.date_Naissance),
          numTel: this.fb.control(this.conducteur.numTel),
        })
      },
      error : (err)=> {
        console.log(err);
      }
    })
  }

  handleUpdateConducteur() {
    let c= this.updateConducteurFormGroup.value;
    c.cin=this.conducteur.cin;
    this.conducteurService.saveConducteur(c).subscribe({
      next : (data)=>{
        alert("La modification est faite avec succée");
        this.router.navigateByUrl("/conducteurs")
      },
      error:err => {
        console.log(err);
      }
    })
  }
}

