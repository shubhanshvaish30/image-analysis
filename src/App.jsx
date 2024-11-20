import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes , Route} from 'react-router-dom'
import MedicalImageUpload from './components/shared/MedicalImageAnalysis'
import ImageUploader from './components/shared/MedicalImageAnalysis'
import ImageAnalysisPage from './components/shared/ImageAnalysis'
import HomePage from './components/shared/HomePage'
import AllReports from './components/shared/AllReports'

function App() {

  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/imageAnalysis' element={<ImageUploader/>} />
          <Route path='/allReports' element={<AllReports/>} />
          <Route path='/details' element={<ImageAnalysisPage/>} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
