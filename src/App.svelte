<script>
  import "./index.css"
  import Header from './Components/Header.svelte'
  import AudioControls from './Components/AudioControls.svelte'
  import MainWindow from './Components/MainWindow.svelte'
  import Controls from './Components/Controls.svelte'
</script>

<main class="w-full h-full flex flex-col bg-gray-800 border-b-gray-900">

  <Header/>

  <AudioControls/>

  <div id="mainWindow" class="flex flex-1 justify-center items-center">

    <MainWindow/>

    <Controls/>

  </div>

</main>
