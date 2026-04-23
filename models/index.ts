import Adherent from "./Adherent";
import PreDemande from "./PreDemande";
import PaiementCotisation from "./PaiementCotisation";
import Parcelle from "./Parcelle";
import Evenement from "./Evenement";
import InscriptionEvenement from "./InscriptionEvenement";
import Message from "./Message";
import Don from "./Don";
import ContactMessage from "./ContactMessage";


// PreDemande → Adherent
PreDemande.hasOne(Adherent, {
  foreignKey: "pre_demande_id",
});

Adherent.belongsTo(PreDemande, {
  foreignKey: "pre_demande_id",
});


// Adherent → PaiementCotisation
Adherent.hasMany(PaiementCotisation, {
  foreignKey: "adherent_id",
});

PaiementCotisation.belongsTo(Adherent, {
  foreignKey: "adherent_id",
});


// Adherent → Parcelle
Adherent.hasMany(Parcelle, {
  foreignKey: "adherent_id",
});

Parcelle.belongsTo(Adherent, {
  foreignKey: "adherent_id",
});


// Evenement → InscriptionEvenement
Evenement.hasMany(InscriptionEvenement, {
  foreignKey: "evenement_id",
});

InscriptionEvenement.belongsTo(Evenement, {
  foreignKey: "evenement_id",
});


// Adherent → Message (sender)
Adherent.hasMany(Message, {
  foreignKey: "sender_id",
});

Message.belongsTo(Adherent, {
  foreignKey: "sender_id",
});


// Adherent → Message (receiver)
Adherent.hasMany(Message, {
  foreignKey: "receiver_id",
});

Message.belongsTo(Adherent, {
  foreignKey: "receiver_id",
});

export {
  Adherent,
  PreDemande,
  PaiementCotisation,
  Parcelle,
  Evenement,
  InscriptionEvenement,
  Message,
  Don,
  ContactMessage,
};