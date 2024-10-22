import { useState, useEffect } from 'react'
import { deviceReleaseYears } from '../constants'

// Interface for the device information
interface DeviceInfo {
  deviceType: string
  deviceName: string
  deviceAge: string | number // Age can be string (e.g., "N/A") or a number
}

// Default device information
const defaultDeviceInfo: DeviceInfo = {
  deviceType: 'Unknown',
  deviceName: 'Unknown Device',
  deviceAge: 'N/A'
}

const useDeviceInfo = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(defaultDeviceInfo)

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()

    // Determine device type (mobile or desktop)
    let deviceType = ''
    if (/mobile|android|iphone|ipad|tablet/.test(userAgent)) {
      deviceType = 'Mobile'
    } else {
      deviceType = 'Desktop'
    }

    // Determine device name and calculate device age based on release year
    let deviceName = 'Unknown Device'
    let releaseYear: number | null = null

    if (userAgent.includes('iphone')) {
      deviceName = 'iPhone'
      const modelMatch = userAgent.match(/iphone\s(\d+)/i)
      if (modelMatch) {
        deviceName += ` ${modelMatch[1]}`
        releaseYear = deviceReleaseYears[`iphone ${modelMatch[1]}`.toLowerCase()] || null
      }
    } else if (userAgent.includes('ipad')) {
      deviceName = 'iPad'
      releaseYear = deviceReleaseYears['ipad']
    } else if (userAgent.includes('samsung')) {
      const modelMatch = userAgent.match(/samsung galaxy s(\d+)/i)
      if (modelMatch) {
        deviceName = `Samsung Galaxy S${modelMatch[1]}`
        releaseYear = deviceReleaseYears[`samsung galaxy s${modelMatch[1]}`] || null
      } else {
        // Check for Note series
        const noteMatch = userAgent.match(/samsung galaxy note(\d+)/i)
        if (noteMatch) {
          deviceName = `Samsung Galaxy Note ${noteMatch[1]}`
          releaseYear = deviceReleaseYears[`samsung galaxy note ${noteMatch[1]}`] || null
        }
      }
    } else if (userAgent.includes('android')) {
      deviceName = 'Android Device'
      releaseYear = deviceReleaseYears['android']
    }

    // Check for other devices based on brand
    const brandMatches = [
      { name: 'Pixel', regex: /pixel/i },
      { name: 'Huawei', regex: /huawei/i },
      { name: 'Xiaomi', regex: /xiaomi/i },
      { name: 'OnePlus', regex: /oneplus/i }
    ]

    for (const { name, regex } of brandMatches) {
      if (regex.test(userAgent)) {
        deviceName = name
        releaseYear = deviceReleaseYears[name.toLowerCase()] || null
        break
      }
    }

    // Default case for unknown devices
    if (!releaseYear) {
      deviceName = 'Unknown Device'
      releaseYear = 2023 // Default to current year
    }

    // Calculate device age
    const currentYear = new Date().getFullYear()
    const deviceAge = releaseYear ? currentYear - releaseYear : 'N/A'

    // Update device info in state
    setDeviceInfo({
      deviceType,
      deviceName,
      deviceAge // Automatically calculated age
    })
  }, [])

  return deviceInfo
}

export default useDeviceInfo
