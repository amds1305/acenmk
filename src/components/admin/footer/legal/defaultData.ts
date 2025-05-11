
import { LegalContents } from './types';

export const defaultLegalContents: LegalContents = {
  legalNotice: {
    title: "Mentions légales",
    content: `<h2>Mentions légales</h2>
    <p>Le présent site est édité par [Nom de votre entreprise], société par actions simplifiée au capital de [montant] euros, immatriculée au Registre du Commerce et des Sociétés de [ville] sous le numéro [numéro RCS], dont le siège social est situé [adresse complète].</p>
    
    <h3>Directeur de la publication</h3>
    <p>[Nom du directeur de publication], [fonction]</p>
    
    <h3>Hébergement</h3>
    <p>Le site est hébergé par [nom de l'hébergeur], [adresse de l'hébergeur], [téléphone de l'hébergeur].</p>
    
    <h3>Propriété intellectuelle</h3>
    <p>L'ensemble du contenu présent sur ce site (textes, graphismes, logos, images, icônes, etc.) est la propriété exclusive de [Nom de votre entreprise]. Toute reproduction, représentation, modification, publication, adaptation ou exploitation, partielle ou intégrale, du contenu de ce site, par quelque procédé que ce soit et sur quelque support que ce soit, est strictement interdite sans l'autorisation écrite préalable de [Nom de votre entreprise].</p>`,
    metaDescription: "Mentions légales de notre entreprise",
    isPublished: true
  },
  privacyPolicy: {
    title: "Politique de confidentialité",
    content: `<h2>Politique de confidentialité</h2>
    <p>Chez [Nom de votre entreprise], nous prenons la protection de vos données personnelles très au sérieux. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations personnelles.</p>
    
    <h3>Collecte des données</h3>
    <p>Nous collectons les informations que vous nous fournissez directement, comme vos coordonnées lors de la création d'un compte ou lorsque vous utilisez nos services. Nous pouvons également recueillir automatiquement certaines informations techniques, telles que votre adresse IP ou votre type de navigateur.</p>
    
    <h3>Utilisation des données</h3>
    <p>Nous utilisons vos données personnelles pour :</p>
    <ul>
      <li>Fournir, maintenir et améliorer nos services</li>
      <li>Traiter vos transactions et gérer votre compte</li>
      <li>Communiquer avec vous concernant nos services</li>
      <li>Prévenir la fraude et assurer la sécurité</li>
      <li>Se conformer aux obligations légales</li>
    </ul>
    
    <h3>Partage des données</h3>
    <p>Nous ne vendons pas vos données personnelles à des tiers. Nous pouvons partager vos informations avec :</p>
    <ul>
      <li>Nos prestataires de services qui nous aident à exploiter notre activité</li>
      <li>Les autorités légales lorsque requis par la loi</li>
    </ul>
    
    <h3>Vos droits</h3>
    <p>Conformément à la réglementation applicable, vous disposez de droits concernant vos données personnelles, notamment d'accès, de rectification, d'effacement, de limitation du traitement, de portabilité et d'opposition. Pour exercer ces droits, contactez-nous à [adresse email].</p>`,
    metaDescription: "Notre politique de confidentialité concernant vos données personnelles",
    isPublished: true
  },
  termsOfUse: {
    title: "Conditions d'utilisation",
    content: `<h2>Conditions générales d'utilisation</h2>
    <p>Les présentes conditions générales d'utilisation (CGU) régissent l'utilisation du site web [votre-site.com] et les services proposés par [Nom de votre entreprise].</p>
    
    <h3>Acceptation des conditions</h3>
    <p>En accédant et en utilisant ce site, vous acceptez d'être lié par ces conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site.</p>
    
    <h3>Utilisation du site</h3>
    <p>Vous vous engagez à utiliser notre site conformément aux lois et réglementations en vigueur et de manière à ne pas porter atteinte aux droits de tiers. L'utilisation non autorisée du site peut donner lieu à une demande de dommages et intérêts et/ou constituer une infraction pénale.</p>
    
    <h3>Comptes utilisateurs</h3>
    <p>Certaines fonctionnalités de notre site peuvent nécessiter la création d'un compte. Vous êtes responsable de maintenir la confidentialité de vos identifiants et de toutes les activités qui se produisent sous votre compte.</p>
    
    <h3>Limitation de responsabilité</h3>
    <p>[Nom de votre entreprise] ne peut garantir que le site sera disponible de façon ininterrompue et sans erreur. Nous nous réservons le droit de suspendre, interrompre ou modifier le site sans préavis.</p>
    
    <h3>Modification des conditions</h3>
    <p>Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications entrent en vigueur dès leur publication sur le site. Votre utilisation continue du site après la publication des modifications constitue votre acceptation de ces modifications.</p>`,
    metaDescription: "Conditions générales d'utilisation de nos services",
    isPublished: true
  },
  cookiesPolicy: {
    title: "Politique des cookies",
    content: `<h2>Politique des cookies</h2>
    <p>Cette politique des cookies explique comment [Nom de votre entreprise] utilise les cookies et technologies similaires sur notre site web.</p>
    
    <h3>Qu'est-ce qu'un cookie ?</h3>
    <p>Un cookie est un petit fichier texte placé sur votre appareil lors de votre visite sur notre site. Les cookies nous permettent de distinguer les utilisateurs, de mémoriser vos préférences et de vous offrir une expérience personnalisée.</p>
    
    <h3>Types de cookies utilisés</h3>
    <p>Nous utilisons les types de cookies suivants :</p>
    <ul>
      <li><strong>Cookies essentiels :</strong> nécessaires au fonctionnement du site</li>
      <li><strong>Cookies de préférences :</strong> permettent de mémoriser vos préférences</li>
      <li><strong>Cookies statistiques :</strong> nous aident à comprendre comment les visiteurs interagissent avec notre site</li>
      <li><strong>Cookies marketing :</strong> utilisés pour vous présenter des publicités pertinentes</li>
    </ul>
    
    <h3>Gestion des cookies</h3>
    <p>Vous pouvez gérer ou supprimer les cookies selon vos préférences via les paramètres de votre navigateur. Pour plus d'informations sur la façon de gérer les cookies, consultez la documentation de votre navigateur.</p>
    
    <h3>Contact</h3>
    <p>Si vous avez des questions concernant notre utilisation des cookies, veuillez nous contacter à [adresse email].</p>`,
    metaDescription: "Notre politique concernant l'utilisation des cookies",
    isPublished: true
  }
};
