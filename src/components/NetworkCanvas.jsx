import { useEffect, useRef } from 'react'

const SKILLS = [
  'HTML', 'CSS', 'SASS', 'TAILWIND', 'REACT', 'JAVASCRIPT',
  'MAKE.COM', 'FIGMA', 'N8N', 'SHOPIFY', 'KLAVIYO', 'JIRA',
  'CONFLUENCE', 'CLAUDE', 'CURSOR', 'SHOPIFY FLOW',
]

const PROJECTS = [
  'JOLLEIN', 'EICHHOLTZ', 'CHOCOLATEMAKERS', 'IDYL',
  'ANANDA', 'ALPHAMEN', 'SPRIET', 'KASSL', 'GRAYLABEL',
]

function createNodes(width, height, count) {
  const nodes = []
  const margin = 40
  for (let i = 0; i < count; i++) {
    const x = margin + Math.random() * (width - margin * 2)
    const y = margin + Math.random() * (height - margin * 2)
    nodes.push({
      x, y,
      originX: x,
      originY: y,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      skill: SKILLS[i % SKILLS.length],
      project: PROJECTS[i % PROJECTS.length],
    })
  }
  return nodes
}

export default function NetworkCanvas({ dimmed = false }) {
  const canvasRef = useRef(null)
  const nodesRef = useRef([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let w, h

    function resize() {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * window.devicePixelRatio
      canvas.height = h * window.devicePixelRatio
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0)

      const count = w < 768 ? 50 : 90
      if (nodesRef.current.length === 0 || Math.abs(nodesRef.current.length - count) > 15) {
        nodesRef.current = createNodes(w, h, count)
      }
    }

    resize()
    window.addEventListener('resize', resize)

    const smoothMouse = { x: -9999, y: -9999 }

    function onMouseMove(e) {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMouseMove)

    function animate() {
      ctx.clearRect(0, 0, w, h)
      const nodes = nodesRef.current
      const mouse = mouseRef.current
      const connectionDist = w < 768 ? 160 : 220

      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.1
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.1

      const attractRadius = 280
      const attractRadiusSq = attractRadius * attractRadius

      for (const node of nodes) {
        const dx = smoothMouse.x - node.x
        const dy = smoothMouse.y - node.y
        const distSq = dx * dx + dy * dy

        if (distSq < attractRadiusSq && distSq > 100) {
          const dist = Math.sqrt(distSq)
          const t = 1 - dist / attractRadius
          const force = t * t * 0.35
          node.vx += (dx / dist) * force
          node.vy += (dy / dist) * force
        }

        node.vx += (node.originX - node.x) * 0.001
        node.vy += (node.originY - node.y) * 0.001
        node.vx *= 0.96
        node.vy *= 0.96

        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy)
        if (speed < 0.15) {
          node.vx += (Math.random() - 0.5) * 0.04
          node.vy += (Math.random() - 0.5) * 0.04
        }

        node.x += node.vx
        node.y += node.vy

        const margin = 20
        if (node.x < margin) { node.x = margin; node.vx = Math.abs(node.vx) * 0.4 }
        if (node.x > w - margin) { node.x = w - margin; node.vx = -Math.abs(node.vx) * 0.4 }
        if (node.y < margin) { node.y = margin; node.vy = Math.abs(node.vy) * 0.4 }
        if (node.y > h - margin) { node.y = h - margin; node.vy = -Math.abs(node.vy) * 0.4 }
      }

      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connectionDist) {
            const mx = (nodes[i].x + nodes[j].x) / 2
            const my = (nodes[i].y + nodes[j].y) / 2
            const mdx = mx - smoothMouse.x
            const mdy = my - smoothMouse.y
            const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy)
            const mouseBoost = mouseDist < 250 ? (1 - mouseDist / 250) * 0.25 : 0

            const baseAlpha = (1 - dist / connectionDist) * 0.2
            const alpha = Math.min(baseAlpha + mouseBoost, 0.5)

            if (mouseBoost > 0.05) {
              const green = Math.round(180 + mouseBoost * 300)
              ctx.strokeStyle = `rgba(${Math.round(180 * mouseBoost)}, ${green}, ${Math.round(57 * mouseBoost)}, ${alpha})`
            } else {
              ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`
            }

            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      for (const node of nodes) {
        const dx = node.x - smoothMouse.x
        const dy = node.y - smoothMouse.y
        const mouseDist = Math.sqrt(dx * dx + dy * dy)
        const isActive = mouseDist < 200

        const label = isActive ? node.project : node.skill
        ctx.font = `700 11px "Space Grotesk", sans-serif`

        const textWidth = ctx.measureText(label).width
        const padX = 7
        const boxW = textWidth + padX * 2
        const boxH = 20

        ctx.fillStyle = isActive ? '#b4ff39' : '#fff'
        ctx.fillRect(node.x - boxW / 2, node.y - boxH / 2, boxW, boxH)

        ctx.fillStyle = '#000'
        ctx.fillText(label, node.x, node.y + 1)
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="network-canvas" style={{ opacity: dimmed ? 0.15 : 1, transition: 'opacity 0.5s' }} />
}
