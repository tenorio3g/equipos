<!-- Carga Firebase v8 (namespaced, como en tu otro proyecto) -->
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>

<script>
  // Configuración Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyBW_fvQaubSplkMGGlrSWcszpBsnxML_iA",
    authDomain: "equipos-beaf1.firebaseapp.com",
    projectId: "equipos-beaf1",
    storageBucket: "equipos-beaf1.appspot.com", // 👈 corregido
    messagingSenderId: "190150028300",
    appId: "1:190150028300:web:df3a8d191a884e4974d229"
  };

  // Inicializar Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
</script>
