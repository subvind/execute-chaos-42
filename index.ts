// Logger class for friendly console output
class FriendlyLogger {
  static log(message: string): void {
    console.log(`🔬 ${new Date().toLocaleTimeString()} - ${message}`);
  }

  static warn(message: string): void {
    console.warn(`⚠️ ${new Date().toLocaleTimeString()} - ${message}`);
  }

  static error(message: string): void {
    console.error(`❌ ${new Date().toLocaleTimeString()} - ${message}`);
  }
}

class Scientist {
  constructor(
    public id: string,
    public name: string,
    public discovery: string
  ) {}
}

class Message {
  constructor(
    public from: Scientist,
    public to: Scientist,
    public content: string,
    public timestamp: Date = new Date()
  ) {}
}

class ScientificPagerSystem {
  private scientists: Map<string, Scientist> = new Map();
  private messages: Message[] = [];

  addScientist(scientist: Scientist): void {
    this.scientists.set(scientist.id, scientist);
    FriendlyLogger.log(`Added scientist: ${scientist.name} (${scientist.discovery})`);
  }

  sendMessage(from: string, to: string, content: string): void {
    const sender = this.scientists.get(from);
    const recipient = this.scientists.get(to);

    if (!sender || !recipient) {
      FriendlyLogger.error("Failed to send message: Sender or recipient not found");
      throw new Error("Sender or recipient not found");
    }

    const message = new Message(sender, recipient, content);
    this.messages.push(message);
    FriendlyLogger.log(`Message sent from ${sender.name} to ${recipient.name}`);
  }

  getMessagesForScientist(scientistId: string): Message[] {
    const scientist = this.scientists.get(scientistId);
    if (!scientist) {
      FriendlyLogger.warn(`No scientist found with ID: ${scientistId}`);
      return [];
    }
    const messages = this.messages.filter(
      (msg) => msg.to.id === scientistId || msg.from.id === scientistId
    );
    FriendlyLogger.log(`Retrieved ${messages.length} messages for ${scientist.name}`);
    return messages;
  }

  executeChaos42(executorId: string): void {
    const executor = this.scientists.get(executorId);
    if (!executor) {
      FriendlyLogger.error(`Failed to execute Chaos 42: Executor with ID ${executorId} not found`);
      throw new Error("Executor not found");
    }

    let affectedCount = 0;
    this.scientists.forEach((scientist) => {
      const randomNumber = Math.floor(Math.random() * 1000000);
      const content = `${randomNumber} KABOOM!!!`;
      const message = new Message(executor, scientist, content);
      this.messages.push(message);
      affectedCount++;
    });

    FriendlyLogger.log(`Chaos 42 initiated by ${executor.name}. ${affectedCount} scientists affected!`);
  }
}

// Example usage
FriendlyLogger.log("Initializing Scientific Pager System");
const pagerSystem = new ScientificPagerSystem();

const annonymous = new Scientist("0", "Annonymous", "The Big Kaboom");
const newton = new Scientist("1", "Isaac Newton", "Law of Universal Gravitation");
const einstein = new Scientist("2", "Albert Einstein", "Theory of Relativity");
const curie = new Scientist("3", "Marie Curie", "Radioactivity");
const darwin = new Scientist("4", "Charles Darwin", "Theory of Evolution");

pagerSystem.addScientist(newton);
pagerSystem.addScientist(einstein);
pagerSystem.addScientist(curie);
pagerSystem.addScientist(darwin);
pagerSystem.addScientist(annonymous);

FriendlyLogger.log("Sending test messages");
pagerSystem.sendMessage("1", "2", "Einstein, I've got a brilliant idea about apples!");
pagerSystem.sendMessage("2", "1", "Newton, let's discuss the fabric of spacetime.");

FriendlyLogger.log("Retrieving messages for Newton");
const newtonMessages = pagerSystem.getMessagesForScientist("1");
newtonMessages.forEach(msg => {
  FriendlyLogger.log(`Message from ${msg.from.name} to ${msg.to.name}: "${msg.content}"`);
});

FriendlyLogger.log("Initiating Chaos 42");
pagerSystem.executeChaos42("0");

FriendlyLogger.log("Checking messages after Chaos 42");
const newtonMessages2 = pagerSystem.getMessagesForScientist("1");
newtonMessages2.forEach(msg => {
  FriendlyLogger.log(`Message from ${msg.from.name} to ${msg.to.name}: "${msg.content}"`);
});
const einsteinMessages = pagerSystem.getMessagesForScientist("2");
einsteinMessages.forEach(msg => {
  FriendlyLogger.log(`Message from ${msg.from.name} to ${msg.to.name}: "${msg.content}"`);
});
const curieMessages = pagerSystem.getMessagesForScientist("3");
curieMessages.forEach(msg => {
  FriendlyLogger.log(`Message from ${msg.from.name} to ${msg.to.name}: "${msg.content}"`);
});
const darwinMessages = pagerSystem.getMessagesForScientist("4");
darwinMessages.forEach(msg => {
  FriendlyLogger.log(`Message from ${msg.from.name} to ${msg.to.name}: "${msg.content}"`);
});

FriendlyLogger.log("Scientific Pager System demonstration completed");