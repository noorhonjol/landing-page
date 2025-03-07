const navListEL = document.getElementById('navbar__list');
const sections = document.querySelectorAll('.landing__container')
const VALUE = 160;

const cleanLinksList = ()=>{
    document.querySelectorAll('#navbar__list a').forEach(el => el.classList.remove('active'));
}
const cleanSections = ()=>{
    sections.forEach(el=>el.parentElement.classList.remove('active'))
}

const generateNavList = () => {

    const navList = Array.from(sections).map(section => {
        const parent=section.parentElement;
        return { 
            title: parent.dataset.nav, 
            href: `#${parent.id}`,
            isActive: parent.classList.contains('active')
        };
    });
    return navList;
};


const makeItActive = (element,cleanFunction)=>{
    cleanFunction();
    element.classList.add('active');
}

const createLink=({title,href,isActive})=>{
    const link = document.createElement('a');
    link.textContent = title;
    link.href = href;
    isActive&&link.classList.add('active')
    link.onclick = (e)=>makeItActive(e.target,cleanLinksList);
    return link;
}

const createNavListItem = (linkData)=>{
    const listItem = document.createElement('li');
    listItem.appendChild(createLink(linkData))
    listItem
    return listItem;
}



const scrollingActive = ()=>{
    sections.forEach(section=>{
        const box = section.getBoundingClientRect();
        if(box.top <= VALUE && box.bottom >= VALUE){
            const parent = section.parentElement;
            const link = document.querySelector(`#navbar__list a[href="#${parent.id}"]`)
            makeItActive(link,cleanLinksList)
            makeItActive(parent,cleanSections)
        }
    })
}


document.onscroll = scrollingActive
navListEL.append(...generateNavList().map(createNavListItem));
