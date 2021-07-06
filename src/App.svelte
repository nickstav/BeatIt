<script>
  import "./index.css"
  import Header from './Components/Header.svelte'
  import AudioControls from './Components/AudioControls.svelte'
  import MainWindow from './Components/MainWindow.svelte'
  import Sidebar from './Components/Sidebar.svelte'
  import TrackOptions from './Components/TrackOptions.svelte'
</script>

<main class="w-full h-full flex flex-col bg-gray-800 border-b-gray-900">

  <Header/>

  <AudioControls/>

  <div id="mainWindow" class="flex flex-1 justify-center items-center">

    <MainWindow/>

    <Sidebar/>

  </div>

  <div id="trackOptionsContainer" class="w-full h-36 flex flex-col justify-center items-center">
    <TrackOptions/>
  </div>

</main>
