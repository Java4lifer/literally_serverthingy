const containers = document.querySelectorAll("div.ia21-play")
            // for(let i = 0; i <= containers; i++) {
            //     console.log(containers[1])
            // } <-- performace

            containers.forEach(async el => {
                const playPause = el.querySelector("button.play-pause")
                const video = el.querySelector("video")
                const timeline = el.querySelector(".dragbar.timeline")
                const timelinedrag = el.querySelector(".draggable")
                const timer = el.querySelector(".timer")
                const dragbars = el.querySelectorAll(".dragbar")
                const descri = el.querySelector(".desc")
                const ler = el.querySelector("button.mler")
                const playlist = document.querySelector(".playlist")
                //--------------------------------------------------------------------
                // const req = await fetch("el.dataset.playlist")
                // const json = await req.json()

                // let html = ""
                // json.forEach(film => {
                //     html += `<div>${film.title}</div>`
                //     playlist.innerHTML = html
                // })
                //--------------------------------------------------------------------
                
                
                //playPause.onclick = () => video.play()
                playPause.addEventListener("click", () => {
                    if(video.paused) {
                        video.play()
                        playPause.innerHTML = `&#x23f8;&#xfe0e;`
                        return
                    }

                    video.pause()
                    playPause.innerHTML = "▶"
                })
                
                video.addEventListener("timeupdate", () => {
                    const percent = (video.currentTime / video.duration) * 100
                    
                    const sec = Math.floor(video.currentTime)
                    const min = Math.floor(sec/60)
                    const hor = Math.floor(min/60)
                    const hors = `${hor % 60}`.padStart(2, "0")
                    const mins = `${min % 60}`.padStart(2, "0")
                    const secs = `${sec % 60}`.padStart(2, "0")
                    
                    timelinedrag.style.setProperty("--percent", `${percent}%`)
                    if(hor > 0) timer.innerHTML = `${hors}:${mins}:${secs}`
                    else timer.innerHTML = `${mins}:${secs}`
                })
                let letty = false
                ler.addEventListener("click", () => {
                    if(letty == false) {
                        descri.style.setProperty("white-space","normal")
                        letty = true
                        ler.innerHTML = "Ler menos"
                        return
                    }

                    descri.style.setProperty("white-space","nowrap")
                    letty = false
                    ler.innerHTML = "Ler mais"
                })
                dragbars.forEach(dragbar => {
                    const dragabble = dragbar.querySelector(".draggable")

                    if(dragbar.classList.contains("volume")) {
                        dragabble.style.setProperty("--percent", `100%`)
                    }
                    dragbar.addEventListener("mousedown", ev => {
                        dragbar.classList.add("dragging")
                    })
                    dragbar.addEventListener("mouseup", ev => {
                        dragbar.classList.remove("dragging")
                    })
                    dragbar.addEventListener("mouseout", ev => {
                        dragbar.classList.remove("dragging")
                    })

                    dragbar.addEventListener("mousemove", ev => {
                        if(ev.target  != dragbar || !dragbar.classList.contains("dragging")) return
                        
                        const width = Math.floor(dragbar.getBoundingClientRect().width)
                        const index = (ev.offsetX / width)
                        const percent = index * 100
                        dragabble.style.setProperty('--percent', `${percent}%`)
                    })

                    dragbar.addEventListener("mouseup", ev => {
                        if(ev.target  != dragbar) return

                        const width = Math.floor(dragbar.getBoundingClientRect().width)
                        const index = (ev.offsetX / width)
                        const percent = index * 100

                        dragabble.style.setProperty('--percent', `${percent}%`)
                        
                        if(dragbar.classList.contains("timeline")) {
                            video.currentTime = video.duration * index
                            return
                        }
                        if(dragbar.classList.contains("volume")) {
                            video.volume = index
                            return
                        }
                    })
                })
            }) // <-- funcional