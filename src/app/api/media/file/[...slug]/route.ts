import { NextRequest, NextResponse } from 'next/server'
import { createReadStream, existsSync } from 'fs'
import path from 'path'
import { stat } from 'fs/promises'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  try {
    // Get the file path from the URL parameters
    const filePath = decodeURIComponent(params.slug.join('/'))
    
    // Construct the full path to the media file
    const fullPath = path.join(process.cwd(), 'media', filePath)
    
    // Check if file exists
    if (!existsSync(fullPath)) {
      return new NextResponse('File not found', { status: 404 })
    }

    // Get file stats
    const fileStat = await stat(fullPath)
    const fileSize = fileStat.size

    // Determine content type based on file extension
    const ext = path.extname(fullPath).toLowerCase()
    let contentType = 'application/octet-stream'
    
    switch (ext) {
      case '.pdf':
        contentType = 'application/pdf'
        break
      case '.jpg':
      case '.jpeg':
        contentType = 'image/jpeg'
        break
      case '.png':
        contentType = 'image/png'
        break
      case '.gif':
        contentType = 'image/gif'
        break
      case '.webp':
        contentType = 'image/webp'
        break
      case '.svg':
        contentType = 'image/svg+xml'
        break
      case '.mp4':
        contentType = 'video/mp4'
        break
      case '.webm':
        contentType = 'video/webm'
        break
    }

    // Handle range requests for better PDF/video streaming
    const range = request.headers.get('range')
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-')
      const start = parseInt(parts[0], 10)
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
      const chunkSize = end - start + 1
      
      const stream = createReadStream(fullPath, { start, end })
      
      return new NextResponse(stream as any, {
        status: 206,
        headers: {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunkSize.toString(),
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable', // 1 year cache
        },
      })
    }

    // Regular file serving
    const stream = createReadStream(fullPath)
    
    return new NextResponse(stream as any, {
      headers: {
        'Content-Type': contentType,
        'Content-Length': fileSize.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable', // 1 year cache
        'Accept-Ranges': 'bytes',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
        'Access-Control-Allow-Headers': 'Range',
      },
    })
    
  } catch (error) {
    console.error('Error serving media file:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function OPTIONS(
  request: NextRequest
) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Range, Content-Type',
    },
  })
}

export async function HEAD(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  try {
    // Get the file path from the URL parameters
    const filePath = decodeURIComponent(params.slug.join('/'))
    
    // Construct the full path to the media file
    const fullPath = path.join(process.cwd(), 'media', filePath)
    
    // Check if file exists
    if (!existsSync(fullPath)) {
      return new NextResponse(null, { status: 404 })
    }

    // Get file stats
    const fileStat = await stat(fullPath)
    const fileSize = fileStat.size

    // Determine content type based on file extension
    const ext = path.extname(fullPath).toLowerCase()
    let contentType = 'application/octet-stream'
    
    switch (ext) {
      case '.pdf':
        contentType = 'application/pdf'
        break
      case '.jpg':
      case '.jpeg':
        contentType = 'image/jpeg'
        break
      case '.png':
        contentType = 'image/png'
        break
      case '.gif':
        contentType = 'image/gif'
        break
      case '.webp':
        contentType = 'image/webp'
        break
      case '.svg':
        contentType = 'image/svg+xml'
        break
      case '.mp4':
        contentType = 'video/mp4'
        break
      case '.webm':
        contentType = 'video/webm'
        break
    }

    return new NextResponse(null, {
      headers: {
        'Content-Type': contentType,
        'Content-Length': fileSize.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Accept-Ranges': 'bytes',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
        'Access-Control-Allow-Headers': 'Range',
      },
    })
    
  } catch (error) {
    console.error('Error serving media file:', error)
    return new NextResponse(null, { status: 500 })
  }
}